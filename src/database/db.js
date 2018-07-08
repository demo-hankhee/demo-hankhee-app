const q = require('q');
const axios = require('axios');
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidXNlcjExNSIsImRpdmlzaW9uIjoxMTUsImlhdCI6MTUzMTA2NTczOCwiZXhwIjoxNTMxMDY5MzM4fQ.h09KcI72o5k4K1hK0LQs02z5dATqdmT0i0-ciAlagj8';
let baseUrl = 'https://demo-hankhee.herokuapp.com/';

module.exports.setToken = (t) => {
    token = t;
}

const createHeader = () => {
    return {
        'content-Type': 'application/json',
        authorization: `bearer ${token}`
    };
}

module.exports.createDemo = () => {
    let deferred = q.defer();
    axios.post(baseUrl + 'api/misc/createdemo')
    .then(user => {
        deferred.resolve(user.data); 
    });

    return deferred.promise;
}

module.exports.getMembers = () => {
    let deferred = q.defer();
    let headers = createHeader();
    console.log(headers);
    axios({
        method: 'GET',
        url: baseUrl + 'api/member/search',
        headers
    })
    .then(members => {
        console.log(members.data);
        deferred.resolve(members.data); 
    });

    return deferred.promise;
}

module.exports.getMember = (_id) => {
    let deferred = q.defer();
    let headers = createHeader();
    axios({
        method: 'GET',
        url: baseUrl + 'api/member/search',
        params: {_id},
        headers
    })
    .then(members => {
        deferred.resolve(members.data); 
    });

    return deferred.promise;
}

module.exports.addMember = (member) => {
    let deferred = q.defer();
    let headers = createHeader();

    console.log('addMember', member);
    axios({
        method: 'POST',
        url: baseUrl + 'api/member/create',
        data: member,
        headers
    })
    .then(member => {
        console.log(member);
        deferred.resolve(member);
    })
    .catch(err => {
        console.log(err);
        deferred.reject(err);
    });
    return deferred.promise;

}

module.exports.saveMember = (member) => {
    let deferred = q.defer();
    let headers = createHeader();

    axios({
        method: 'POST',
        url: baseUrl + 'api/member/update',
        data: member,
        headers
    })
    .then(member => {
        deferred.resolve(member);
    })
    .catch(err => {
        deferred.reject(err);
    });
    return deferred.promise;

}

module.exports.deleteMember = (_id) => {
    let headers = createHeader();
    let deferred = q.defer();

    axios({
        method: 'POST',
        url: baseUrl + 'api/member/delete',
        data: {_id},
        headers
    })
    .then(() => {
        deferred.resolve();
        console.log('Deleted');
    })
    .catch(err => {
        deferred.reject(err);
        console.log('Fail deleted', err);
    });

    return deferred.promise;
}