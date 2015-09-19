package project.meta;

//@javax.annotation.Generated(value = { "slim3-gen", "@VERSION@" }, date = "2015-09-19 09:54:12")
/** */
public final class TodoMeta extends org.slim3.datastore.ModelMeta<project.model.Todo> {

    /** */
    public final org.slim3.datastore.StringAttributeMeta<project.model.Todo> description = new org.slim3.datastore.StringAttributeMeta<project.model.Todo>(this, "description", "description");

    /** */
    public final org.slim3.datastore.CoreAttributeMeta<project.model.Todo, java.lang.Integer> finished_quantity = new org.slim3.datastore.CoreAttributeMeta<project.model.Todo, java.lang.Integer>(this, "finished_quantity", "finished_quantity", int.class);

    /** */
    public final org.slim3.datastore.CoreAttributeMeta<project.model.Todo, java.lang.Long> id = new org.slim3.datastore.CoreAttributeMeta<project.model.Todo, java.lang.Long>(this, "id", "id", long.class);

    /** */
    public final org.slim3.datastore.CoreAttributeMeta<project.model.Todo, com.google.appengine.api.datastore.Key> key = new org.slim3.datastore.CoreAttributeMeta<project.model.Todo, com.google.appengine.api.datastore.Key>(this, "__key__", "key", com.google.appengine.api.datastore.Key.class);

    /** */
    public final org.slim3.datastore.StringAttributeMeta<project.model.Todo> title = new org.slim3.datastore.StringAttributeMeta<project.model.Todo>(this, "title", "title");

    /** */
    public final org.slim3.datastore.CoreAttributeMeta<project.model.Todo, java.lang.Integer> total_quantity = new org.slim3.datastore.CoreAttributeMeta<project.model.Todo, java.lang.Integer>(this, "total_quantity", "total_quantity", int.class);

    /** */
    public final org.slim3.datastore.CoreAttributeMeta<project.model.Todo, java.lang.Long> version = new org.slim3.datastore.CoreAttributeMeta<project.model.Todo, java.lang.Long>(this, "version", "version", java.lang.Long.class);

    private static final TodoMeta slim3_singleton = new TodoMeta();

    /**
     * @return the singleton
     */
    public static TodoMeta get() {
       return slim3_singleton;
    }

    /** */
    public TodoMeta() {
        super("Todo", project.model.Todo.class);
    }

    @Override
    public project.model.Todo entityToModel(com.google.appengine.api.datastore.Entity entity) {
        project.model.Todo model = new project.model.Todo();
        model.setDescription((java.lang.String) entity.getProperty("description"));
        model.setFinished_quantity(longToPrimitiveInt((java.lang.Long) entity.getProperty("finished_quantity")));
        model.setId(longToPrimitiveLong((java.lang.Long) entity.getProperty("id")));
        model.setKey(entity.getKey());
        model.setTitle((java.lang.String) entity.getProperty("title"));
        model.setTotal_quantity(longToPrimitiveInt((java.lang.Long) entity.getProperty("total_quantity")));
        model.setVersion((java.lang.Long) entity.getProperty("version"));
        return model;
    }

    @Override
    public com.google.appengine.api.datastore.Entity modelToEntity(java.lang.Object model) {
        project.model.Todo m = (project.model.Todo) model;
        com.google.appengine.api.datastore.Entity entity = null;
        if (m.getKey() != null) {
            entity = new com.google.appengine.api.datastore.Entity(m.getKey());
        } else {
            entity = new com.google.appengine.api.datastore.Entity(kind);
        }
        entity.setProperty("description", m.getDescription());
        entity.setProperty("finished_quantity", m.getFinished_quantity());
        entity.setProperty("id", m.getId());
        entity.setProperty("title", m.getTitle());
        entity.setProperty("total_quantity", m.getTotal_quantity());
        entity.setProperty("version", m.getVersion());
        entity.setProperty("slim3.schemaVersion", 1);
        return entity;
    }

    @Override
    protected com.google.appengine.api.datastore.Key getKey(Object model) {
        project.model.Todo m = (project.model.Todo) model;
        return m.getKey();
    }

    @Override
    protected void setKey(Object model, com.google.appengine.api.datastore.Key key) {
        validateKey(key);
        project.model.Todo m = (project.model.Todo) model;
        m.setKey(key);
    }

    @Override
    protected long getVersion(Object model) {
        project.model.Todo m = (project.model.Todo) model;
        return m.getVersion() != null ? m.getVersion().longValue() : 0L;
    }

    @Override
    protected void assignKeyToModelRefIfNecessary(com.google.appengine.api.datastore.AsyncDatastoreService ds, java.lang.Object model) {
    }

    @Override
    protected void incrementVersion(Object model) {
        project.model.Todo m = (project.model.Todo) model;
        long version = m.getVersion() != null ? m.getVersion().longValue() : 0L;
        m.setVersion(Long.valueOf(version + 1L));
    }

    @Override
    protected void prePut(Object model) {
    }

    @Override
    protected void postGet(Object model) {
    }

    @Override
    public String getSchemaVersionName() {
        return "slim3.schemaVersion";
    }

    @Override
    public String getClassHierarchyListName() {
        return "slim3.classHierarchyList";
    }

    @Override
    protected boolean isCipherProperty(String propertyName) {
        return false;
    }

    @Override
    protected void modelToJson(org.slim3.datastore.json.JsonWriter writer, java.lang.Object model, int maxDepth, int currentDepth) {
        project.model.Todo m = (project.model.Todo) model;
        writer.beginObject();
        org.slim3.datastore.json.Default encoder0 = new org.slim3.datastore.json.Default();
        if(m.getDescription() != null){
            writer.setNextPropertyName("description");
            encoder0.encode(writer, m.getDescription());
        }
        writer.setNextPropertyName("finished_quantity");
        encoder0.encode(writer, m.getFinished_quantity());
        writer.setNextPropertyName("id");
        encoder0.encode(writer, m.getId());
        if(m.getKey() != null){
            writer.setNextPropertyName("key");
            encoder0.encode(writer, m.getKey());
        }
        if(m.getTitle() != null){
            writer.setNextPropertyName("title");
            encoder0.encode(writer, m.getTitle());
        }
        writer.setNextPropertyName("total_quantity");
        encoder0.encode(writer, m.getTotal_quantity());
        if(m.getVersion() != null){
            writer.setNextPropertyName("version");
            encoder0.encode(writer, m.getVersion());
        }
        writer.endObject();
    }

    @Override
    protected project.model.Todo jsonToModel(org.slim3.datastore.json.JsonRootReader rootReader, int maxDepth, int currentDepth) {
        project.model.Todo m = new project.model.Todo();
        org.slim3.datastore.json.JsonReader reader = null;
        org.slim3.datastore.json.Default decoder0 = new org.slim3.datastore.json.Default();
        reader = rootReader.newObjectReader("description");
        m.setDescription(decoder0.decode(reader, m.getDescription()));
        reader = rootReader.newObjectReader("finished_quantity");
        m.setFinished_quantity(decoder0.decode(reader, m.getFinished_quantity()));
        reader = rootReader.newObjectReader("id");
        m.setId(decoder0.decode(reader, m.getId()));
        reader = rootReader.newObjectReader("key");
        m.setKey(decoder0.decode(reader, m.getKey()));
        reader = rootReader.newObjectReader("title");
        m.setTitle(decoder0.decode(reader, m.getTitle()));
        reader = rootReader.newObjectReader("total_quantity");
        m.setTotal_quantity(decoder0.decode(reader, m.getTotal_quantity()));
        reader = rootReader.newObjectReader("version");
        m.setVersion(decoder0.decode(reader, m.getVersion()));
        return m;
    }
}