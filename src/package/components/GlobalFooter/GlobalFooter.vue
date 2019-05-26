<template>
    <div class="footer">
        <div class="copyright">
            Copyright<a-icon type="copyright"/>2018
            &nbsp;<span>白鹭学园技术组出品&nbsp;</span>
            <a href="https://pro.loacg.com/" target="_blank">北京 Donkey RP 有限公司</a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GlobalFooter',
    data () {
        return {}
    }
}
</script>

<style lang="less" scoped>
    .footer {
        padding: 0 10px;
        margin: 20px 0 10px;
        text-align: center;

        .links {
            margin-bottom: 8px;

            a {
                color: rgba(0, 0, 0, 0.45);

                &:hover {
                    color: rgba(0, 0, 0, 0.65);
                }

                &:not(:last-child) {
                    margin-right: 40px;
                }
            }
        }

        .copyright {
            color: rgba(0, 0, 0, 0.45);
            font-size: 14px;
        }
    }
</style>
