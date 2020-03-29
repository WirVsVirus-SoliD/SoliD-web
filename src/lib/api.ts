const domain = process.env.REACT_APP_API_PATH;

export default {
    user: {
        signIn: domain + '/auth/sign_in',
        auth: domain + '/auth'
    },
    campaigns: {
        collection: domain + '/campaigns'
    },
    locations: {
        geoJson: domain + '/locations/all_as_geo_json'
    }
};
