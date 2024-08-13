<template>
    <h1></h1>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods : {
        async callAsync(method, url, body, success, fail) {
            try {
                const response = await fetch(url, {
                    method: method,
                    headers: {
                        Authorization: localStorage.getItem('access_token'),
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify(body)
                });

                if (response.status === 200 || response.status === 201) {
                    return success();
                }
                else if (response.status === 403) {
                    // eslint-disable-next-line
                    token_refresh("http://182.213.2.211:8081/api/token").then(result => {
                        if (result) {
                            localStorage.setItem("access_token", result.accessToken);
                            localStorage.setItem("refresh_token", result.refreshToken);

                            console.log(localStorage.getItem('access_token'));
                            console.log(localStorage.getItem('refresh_token'));

                            if (result.status == 200) {
                                this.callAsync(method, url, body, success, fail);
                            }
                            else if (result.status == 403) {
                                console.log("엑세스 토큰과 리프레스 토큰 유효기간 동시 만료됨");
                            }
                        } else {
                            console.error('Failed to fetch tokens');
                        }
                    });
                }
            } catch (err) {
                console.log(err);
            }
        },
        async token_refresh(url) {
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        Authorization: localStorage.getItem('access_token'),
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        refreshToken: localStorage.getItem('refresh_token'),
                    }),
                });

                const headers = response.headers;
                const accessToken = headers.get('AccessToken');
                const refreshToken = headers.get('RefreshToken');
                const status = response.status;

                const result = {
                    accessToken,
                    refreshToken,
                    status
                };

                return result;

            } catch (err) {
                console.log(err);
            }
        }
    }
}

</script>