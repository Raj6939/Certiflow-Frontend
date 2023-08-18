const issuerStore = {
    namespaced: true,
    state:{
        accessToken:null,
        issuedCred:null,
        userProfileDetails:null
    },
    actions:{
        authenticateEntity:({}) => {
            return new Promise((resolve, reject) => {
                try {
                    resolve()
                } catch (error) {
                    reject(error)
                }
            })
        }
    }
}

export default issuerStore;