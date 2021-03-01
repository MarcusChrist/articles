function parseUrl(url) {
    return ({
        host: url.substring(
            url.lastIndexOf("@") + 1, 
            url.lastIndexOf("/")
        ),
        username: url.substring(
            url.lastIndexOf("//") + 2, 
            url.lastIndexOf(":")
        ),
        password: url.substring(
            url.lastIndexOf(":") + 1, 
            url.lastIndexOf("@")
        ),
        database: url.substring(
            url.lastIndexOf("/") + 1, 
            url.lastIndexOf("?")
        ),
        cloud_name: url.substring(
            url.lastIndexOf("@") + 1
        ),
        api_key: url.substring(
            url.lastIndexOf("//") + 2, 
            url.lastIndexOf(":")
        ),
        api_secret: url.substring(
            url.lastIndexOf(":") + 1, 
            url.lastIndexOf("@")
        ),
    });
};

module.exports = parseUrl;