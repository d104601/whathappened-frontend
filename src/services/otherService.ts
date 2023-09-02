import axios from "axios";

class otherService {
    getLocationData() {
        return axios.get("https://api.ipgeolocation.io/ipgeo", {
            params: {
                apiKey: process.env.REACT_APP_GEOLOCATIONAPI_KEY,
            },
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }).then((response) => {
            return response.data;
        });
    }

    getMktCode(countryCode: String) {
        if(countryCode === "GB") {
            return "en-GB";
        } else if(countryCode === "CN") {
            return "zh-CN";
        } else if(countryCode === "FR") {
            return "fr-FR";
        } else if(countryCode === "DE") {
            return "de-DE";
        } else if(countryCode === "CA") {
            return "en-CA";
        } else {
            return "en-US";
        }
    }

    loadWeatherData(city: String) {
        return axios.get(process.env.REACT_APP_SERVER_URL + "/api/weather", {
            params: {
                city: city
            },
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        });
    }
}

export const OtherService = new otherService();