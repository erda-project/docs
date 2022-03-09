# Database Migration
Erda MySQL migration is a database migration tool.

## Features
This action is used to update SQL scripts in the code repository to the database. You need to submit the SQL scripts for migration to a directory and sort them by module.

If you specify `.erda/migrations` as the directory to store scripts, the directory structure is as follows:

```text
repo-root:.
├── .erda
│  └── migrations
│      ├── config.yml
│      ├── module_1
│      │    ├── 210101_base.sql
│      │    ├── 210101_feature_1.sql
│      │    └── 210201_feature_2.sql
│      │    
│      └── module_2
│           ├── 210101_base.sql
│           └── 210201_some_feature.sql
├── other_directories
└── dice.yml
```
module_1 and module_2 are user-defined business module names, which can be customized. SQL scripts are stored in the module directory.

Erda MySQL migration action will read all scripts and install them into the database.

## Parameters
- **workdir**: The working directory, corresponding to the root directory of the repository, which is ${git-checkout} by default.
- **migrationdir**: The directory where SQL scripts are stored, such as `.erda/migrations` mentioned above.
- **database**: The database name, that is, MySQL schema name.
- **mysqllint**: Whether to check the protocol of the script to be installed.
- **lint_config**: Protocol configuration file. If not filled in, the default configuration will be used.
- **modules**: The list of modules to be migrated, or all modules in the migrationdir directory if not filled in.

## Notes
- This action connects to MySQL addon. If there is no MySQL addon in runtime, the execution will fail.
- If the business table already exists in the database before using the action for the first time, organize the business table structure and initialization data into a baseline SQL script and mark `# MIGRATION_BASE` in the first line.
- If the specified `database` does not exist, the action will create one automatically.
- When executing SQL scripts in the module, the baseline script marked `# MIGRATION_BASE` will be executed first. The action executes baseline scripts in alphabetical order if there are multiple ones, then execute other scripts in alphabetical order as well. So it is recommended to name scripts as "date + number + feature description". The script file name should be suffixed with `.sql`.
- The action executes scripts incrementally, as it only execute the incremented scripts since the previous execution. Do not modify or rename the executed script, otherwise the action cannot make comparisons. The action adds a execution record table `schema_migration_history` in the database to record the executed files for comparison. Please do not delete this table.
- The action only allows data definition language (DDL) and data manipulation language (DML), and does not support transaction control language (TCL) or data control language (DCL), so it does not allow operations such as transaction control or authorization in the script.

## Sample
```yaml
allowed_ddl:    # allowed_ddl indicates whether this type of DDL is allowed to be executed in migration
    create_database_stmt: false
    alter_database_stmt: false
    drop_database_stmt: false
    create_table_stmt: true
    drop_table_stmt: false
    drop_sequence_stmt: false
    rename_table_stmt: false
    create_view_stmt: false
    create_sequence_stmt: false
    create_index_stmt: true
    drop_index_stmt: true
    lock_tables_stmt: false
    unlock_tables_stmt: false
    cleanup_table_lock_stmt: false
    repair_table_stmt: false
    truncate_table_stmt: false
    recover_table_stmt: false
    flash_back_table_stmt: false
    alter_table_option: true
    alter_table_add_columns: true
    alter_table_add_constraint: true
    alter_table_drop_column: false
    alter_table_drop_primary_key: false
    alter_table_drop_index: true
    alter_table_drop_foreign_key: false
    alter_table_modify_column: true
    alter_table_change_column: true
    alter_table_rename_column: false
    alter_table_rename_table: false
    alter_table_alter_column: true
    alter_table_lock: false
    alter_table_algorithm: false
    alter_table_rename_index: true
    alter_table_force: false
    alter_table_add_partitions: false
    alter_table_coalesce_partitions: false
    alter_table_drop_partition: false
    alter_table_truncate_partition: false
    alter_table_partition: false
    alter_table_enable_keys: false
    alter_table_disable_keys: false
    alter_table_remove_partitioning: false
    alter_table_with_validation: false
    alter_table_without_validation: false
    alter_table_secondary_load: false
    alter_table_secondary_unload: false
    alter_table_rebuild_partition: false
    alter_table_reorganize_partition: false
    alter_table_check_partitions: false
    alter_table_exchange_partition: false
    alter_table_optimize_partition: false
    alter_table_repair_partition: false
    alter_table_import_partition_tablespace: false
    alter_table_discard_partition_tablespace: false
    alter_table_alter_check: false
    alter_table_drop_check: false
    alter_table_import_tablespace: false
    alter_table_discard_tablespace: false
    alter_table_index_invisible: false
    alter_table_order_by_columns: false
    alter_table_set_ti_flash_replica: false
allowed_dml:  # allowed_dml indicates whether this type of DML is allowed to be executed in migration
    select_stmt: true
    union_stmt: true
    load_data_stmt: false
    insert_stmt: true
    delete_stmt: false
    update_stmt: true
    show_stmt: true
    split_region_stmt: false
boolean_field_linter: true      # Fields starting with a linking verb should be of type boolean (tinyint(1)), and fields of type boolean should start with a linking verb
charset_linter: true            # The table building statement should show that the charset is utf8mb4
column_comment_linter: true     # Column definition should have comment
column_name_linter: true        # Column names should only contain lower letters, numbers, and underscores, and cannot start with a number nor contain only numbers between two underscores.
created_at_default_value_linter: true # The default value of the created_at field should track the current time
created_at_exists_linter: true  # Table definition should have created_at column
created_at_type_linter: true    # created_at type should be datetime
destruct_linter: true           # Destructive checks: such as not allowing library deletion, table deletion, field deletion, etc.
float_double_linter: true       # Decimals cannot be expressed as float or double, but as decimal
foreign_key_linter: true        # Foreign keys are not allowed
id_exists_linter: true          # Table definition must have the id field
id_is_primary_linter: true      # The id field must be the primary key
id_type_linter: true            # id must be of type bigint
index_length_linter: true       # Index length check, single column index cannot exceed 767 bytes, and joint index cannot exceed 3072 bytes
index_name_linter: true         # Unique index names start with uk_ , and common index names start with idx_
keywords_linter: true           # Keyword check, cannot use MySQL reserved words or keywords as table names
not_null_linter: true           # All fields should be not null when defining the table
table_comment_linter: true      # Table definition should have table comment
table_name_linter: true         # Table name check, basically the same rules as column name check
updated_at_exists_linter: true  # Table definition should have updated_at field
updated_at_type_linter: true    # updated_at field should be of type datetime
updated_at_default_value_linter: true # The default value of the updated_at field should track the creation time
updated_at_on_update_linter: true # The updated_at field should track the update time
varchar_length_linter: true     # The varchar type should not exceed 5,000 in length
complete_insert_linter: true    # The INSERT or REPLACE statements should specify the column names
manual_time_setter_linter: true # Manual created_at or updated_at time is not allowed when modifying row data in migration
```
