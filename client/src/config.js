export const baseUrl =
    process.env.REACT_APP_ENV == 'staging'
        ? 'https://pm-staging.api.maximumaccountability.net'
         : 'https://pm-staging.api.maximumaccountability.net'
        //  :'http://localhost:4001'

export const baseUrlUser =
    process.env.REACT_APP_ENV == 'staging'
        ? 'https://staging.users.api.maximumaccountability.net'
        : 'https://staging.users.api.maximumaccountability.net'
