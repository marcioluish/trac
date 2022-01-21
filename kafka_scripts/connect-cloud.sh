echo "status conector"
curl -i -X POST -H "Accept:application/json" -H  "Content-Type:application/json" http://localhost:8083/connectors/ -d '{
  "name": "mongo status sink",
  "config": {
        "connector.class": "com.mongodb.kafka.connect.MongoSinkConnector",
        "tasks.max": "1",
        "topics": "status",
        "connection.uri": "mongodb://trac:tracpw@trac_db:27017",
        "database": "test",
        "collection": "status",
        "key.converter": "org.apache.kafka.connect.storage.StringConverter",
        "key.converter.schemas.enable":"false",
        "value.converter":"org.apache.kafka.connect.json.JsonConverter",
        "value.converter.schemas.enable":"false"
    }
  }
}'

echo "health level conector"
curl -i -X POST -H "Accept:application/json" -H  "Content-Type:application/json" http://localhost:8083/connectors/ -d '{
  "name": "mongo health level sink",
  "config": {
        "connector.class": "com.mongodb.kafka.connect.MongoSinkConnector",
        "tasks.max": "1",
        "topics": "health_level",
        "connection.uri": "mongodb://trac:tracpw@trac_db:27017",
        "database": "test",
        "collection": "health",
        "key.converter": "org.apache.kafka.connect.storage.StringConverter",
        "key.converter.schemas.enable":"false",
        "value.converter":"org.apache.kafka.connect.json.JsonConverter",
        "value.converter.schemas.enable":"false"
    }
  }
}'