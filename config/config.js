const environments = {
    dev : {
        app_port : 8080,
        db_port : 4049,
        db_name : "mongo",
        db_string : "localhost"
    },
    test : {
        app_port : 8081,
        db_port : 4049,
        db_name : "mongo",
        db_string : "localhost"
    },
    prod : {
        app_port : 8080,
        db_port : 4049,
        db_name : "mongo",
        db_string : "localhost"
    }
}

module.exports.environments = function(env){
    if(!env || /^\s*$/.test(env)){
        env = "test";                           //if empty param set env to test
    }
    return  environments[env]; 
}; 


