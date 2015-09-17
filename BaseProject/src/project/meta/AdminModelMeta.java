package project.meta;

//@javax.annotation.Generated(value = { "slim3-gen", "@VERSION@" }, date = "2015-09-15 12:39:09")
/** */
public final class AdminModelMeta extends org.slim3.datastore.ModelMeta<project.model.AdminModel> {

    /** */
    public final org.slim3.datastore.CoreAttributeMeta<project.model.AdminModel, com.google.appengine.api.datastore.Key> key = new org.slim3.datastore.CoreAttributeMeta<project.model.AdminModel, com.google.appengine.api.datastore.Key>(this, "__key__", "key", com.google.appengine.api.datastore.Key.class);

    /** */
    public final org.slim3.datastore.CoreAttributeMeta<project.model.AdminModel, java.lang.Long> version = new org.slim3.datastore.CoreAttributeMeta<project.model.AdminModel, java.lang.Long>(this, "version", "version", java.lang.Long.class);

    private static final AdminModelMeta slim3_singleton = new AdminModelMeta();

    /**
     * @return the singleton
     */
    public static AdminModelMeta get() {
       return slim3_singleton;
    }

    /** */
    public AdminModelMeta() {
        super("AdminModel", project.model.AdminModel.class);
    }

    @Override
    public project.model.AdminModel entityToModel(com.google.appengine.api.datastore.Entity entity) {
        project.model.AdminModel model = new project.model.AdminModel();
        model.setKey(entity.getKey());
        model.setVersion((java.lang.Long) entity.getProperty("version"));
        return model;
    }

    @Override
    public com.google.appengine.api.datastore.Entity modelToEntity(java.lang.Object model) {
        project.model.AdminModel m = (project.model.AdminModel) model;
        com.google.appengine.api.datastore.Entity entity = null;
        if (m.getKey() != null) {
            entity = new com.google.appengine.api.datastore.Entity(m.getKey());
        } else {
            entity = new com.google.appengine.api.datastore.Entity(kind);
        }
        entity.setProperty("version", m.getVersion());
        entity.setProperty("slim3.schemaVersion", 1);
        return entity;
    }

    @Override
    protected com.google.appengine.api.datastore.Key getKey(Object model) {
        project.model.AdminModel m = (project.model.AdminModel) model;
        return m.getKey();
    }

    @Override
    protected void setKey(Object model, com.google.appengine.api.datastore.Key key) {
        validateKey(key);
        project.model.AdminModel m = (project.model.AdminModel) model;
        m.setKey(key);
    }

    @Override
    protected long getVersion(Object model) {
        project.model.AdminModel m = (project.model.AdminModel) model;
        return m.getVersion() != null ? m.getVersion().longValue() : 0L;
    }

    @Override
    protected void assignKeyToModelRefIfNecessary(com.google.appengine.api.datastore.AsyncDatastoreService ds, java.lang.Object model) {
    }

    @Override
    protected void incrementVersion(Object model) {
        project.model.AdminModel m = (project.model.AdminModel) model;
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
        project.model.AdminModel m = (project.model.AdminModel) model;
        writer.beginObject();
        org.slim3.datastore.json.Default encoder0 = new org.slim3.datastore.json.Default();
        if(m.getKey() != null){
            writer.setNextPropertyName("key");
            encoder0.encode(writer, m.getKey());
        }
        if(m.getVersion() != null){
            writer.setNextPropertyName("version");
            encoder0.encode(writer, m.getVersion());
        }
        writer.endObject();
    }

    @Override
    protected project.model.AdminModel jsonToModel(org.slim3.datastore.json.JsonRootReader rootReader, int maxDepth, int currentDepth) {
        project.model.AdminModel m = new project.model.AdminModel();
        org.slim3.datastore.json.JsonReader reader = null;
        org.slim3.datastore.json.Default decoder0 = new org.slim3.datastore.json.Default();
        reader = rootReader.newObjectReader("key");
        m.setKey(decoder0.decode(reader, m.getKey()));
        reader = rootReader.newObjectReader("version");
        m.setVersion(decoder0.decode(reader, m.getVersion()));
        return m;
    }
}