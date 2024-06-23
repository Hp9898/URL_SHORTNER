const sessionidtoisermap = new Map();

function setUser(id,user)
{
    sessionidtoisermap.set(id,user);
}
function getUser(id,user)
{
    return sessionidtoisermap.get(id);
}

module.exports = {
    setUser,
    getUser
}