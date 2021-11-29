### Erda MySQL Migration
Erda MySQL 数据库迁移工具

#### 功能
该 Action 用于将代码仓库中的 SQLs 脚本更新到数据库中。
用户需要将用于 migration 的 SQLs 脚本提交到某个目录，并按模块进行分门别类。
如指定 `.erda/migrations` 目录为存放脚本的目录，那么目录结构为
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
其中 module_1 和 module_2 是用户定义的业务模块名，可以自定义。
module 目录下存放 SQLs 脚本。

Erda MySQL Migration Action 会读取所有脚本，将安装到数据库中。

#### 参数说明
- workdir: 工作目录, 对应仓库根目录, 默认为 ${git-checkout}
- migrationdir: SQLs 脚本存放目录, 如上文提到的 `.erda/migrations`
- database: 库名, 即 MySQL schema 名称
- mysqllint: 是否要对即将安装的脚本进行规约检查
- lint_config: 进行规约检查时的规约配置文件, 如果不填则使用默认配置
- modules: 要执行 migrate 的模块列表, 如果不填则执行 migrationdir 目录下的所有模块

#### 注意事项
- 该 Action 连接的是 MySQL Addon, 如果 runtime 下没有 MySQL Addon, 会执行失败。
- 如果第一次使用该 Action 之前, 数据库中已经存在业务表了, 要将这部分业务表结构和初始化数据整理成基线 SQL 脚本并在脚本首行标记`# MIGRATION_BASE`。
- 指定的 `database` 如果不存在，该 Action 会自动创建。
- Action 执行模块内的 SQLs 脚本时，首先执行所有的标记了`# MIGRATION_BASE`的基线脚本，基线脚本有多个时，按字符序执行；然后执行其他脚本，其他脚本也是按字符序执行。所以为脚本命名时，务必注意按一定的字符序。建议命名方式为`日期+数字序号+feature描述`。脚本文件名后缀应当为`.sql`。
- Action 对脚本是增量执行的：每次执行前，都会比对执行记录，只执行上次执行后增量的脚本。执行过的脚本不应当修改内容或重命名，不然 Action 就比对不出哪些被执行过了。Action 的比对方式是在数据库中新增一个执行记录表`schema_migration_history`，将执行过的文件都记录下来，请不要删除改表。
- 该 Action 只允许执行 DDL(数据定义语言) 和 DML(数据操作语言)，不支持 TCL(事务控制语言) 和 DCL(数据控制语言)，所以该 Action 不允许脚本中存在事务控制、授权等操作。

#### 示例配置文件
```yaml
allowed_ddl:    # allowed_ddl 表示是否允许在 migration 中执行该类型的 DDL
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
allowed_dml:  # allowed_dml 表示是否允许在 migration 中执行该类型的 DML 
    select_stmt: true
    union_stmt: true
    load_data_stmt: false
    insert_stmt: true
    delete_stmt: false
    update_stmt: true
    show_stmt: true
    split_region_stmt: false
boolean_field_linter: true      # 以系动词开头的字段应当为 boolean（tinyint(1)） 类型, boolean 类型字段命名应当以系动词开头
charset_linter: true            # 建表语句应当显示注明 charset 为 utf8mb4
column_comment_linter: true     # 列定义应当有 comment
column_name_linter: true        # 列命名应当只包含字母数字下划线, 不以数字开头, 两个下划线中不能只有数字, 字母都应当小写
created_at_default_value_linter: true # created_at 默认值应当跟踪当前时间
created_at_exists_linter: true  # 表定义时应当有 created_at 列
created_at_type_linter: true    # created_at 类型应当为 datetime
destruct_linter: true           # 破坏性检查: 如不允许删库、删表、删字段等
float_double_linter: true       # 小数不能用 float 或 double 表示，应当用 decimal
foreign_key_linter: true        # 不允许使用外键
id_exists_linter: true          # 表定义时必须有 id 字段
id_is_primary_linter: true      # id 字段必须是主键
id_type_linter: true            # id 必须是 bigint 类型
index_length_linter: true       # 索引长度检查，单列索引长度不能超过 767 bytes，联合索引长度不能超过 3072 bytes
index_name_linter: true         # 唯一索引名以 uk_ 开头 , 普通索引名以 idx_ 开头
keywords_linter: true           # 关键字检查，不能使用 MySQL 保留字或关键字作为表名列名
not_null_linter: true           # 表定义时所有字段都应当是 not null 的
table_comment_linter: true      # 表定义时应当有表 comment
table_name_linter: true         # 表名检查，与列名检查规则基本相同
updated_at_exists_linter: true  # 表定义时应当有 updated_at 字段
updated_at_type_linter: true    # updated_at 字段的类型应当为 datetime
updated_at_default_value_linter: true # updated_at 字段默认值应当跟踪创建时间
updated_at_on_update_linter: true # updated_at 字段应当跟踪更新时间
varchar_length_linter: true     # varchar 类型长度不应当超过 5000
complete_insert_linter: true    # INSERT 或 REPLACE 语句应当写清列名 
manual_time_setter_linter: true # 不允许在 migration 中修改行数据时手动 created_at 或 updated_at 时间
```
