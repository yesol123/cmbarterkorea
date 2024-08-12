<template>
    <h1></h1>

    <!-- callAsync,token_refresh 함수 불러오기  -->
    <TokenFunction ref="function" />

</template>

<script>
import TokenFunction from '@/components/GetToken.vue';

export default {
    components : {
        TokenFunction
    },
    data() {
        return {

        }
    },
    mounted() {
        this.exec();
    },
    methods: {
        exec() {
            this.login().then(result => {
            if (result) {
                localStorage.setItem("access_token", result.accessToken);
                localStorage.setItem("refresh_token", result.refreshToken);

                console.log(localStorage.getItem('access_token'));
                console.log(localStorage.getItem('refresh_token'));
            } else {
                console.error('Failed to fetch tokens');
            }
            });
        },
        async login() {
            try {
                const response = await fetch('http://localhost:8080/login', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                    username: 'username1',
                    password: 'password1'
                    })
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const headers = response.headers;
                const accessToken = headers.get('AccessToken');
                const refreshToken = headers.get('RefreshToken');

                const result = {
                    accessToken,
                    refreshToken
                };

                return result;

            } catch (error) {
                console.error('Error fetching data:', error);
                return null; // 또는 다른 에러 처리 로직
            }
        },
        // callAsync() {
        //     this.$refs.function.callAsync();
        // },
        // token_refresh() {
        //     this.$refs.function.token_refresh();
        // },
        setTime() {
            setTimeout(() => {
                let josn = {}
                this.$refs.function.callAsync("POST", "http://localhost:8080/api/v1/test", josn, () => { console.log("OK") }, () => { console.log("NO") });
            }, 130000);
        }
    }
}
</script>