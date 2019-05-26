<template>
    <div id="app">
        <s-table
            ref="table"
            size="default"
            rowKey="id"
            :columns="columns"
            :data="loadData"
            :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }">
        </s-table>
    </div>
</template>

<script>
import STable from '@/Table'

export default {
    name: 'app',
    components: {
        STable
    },
    data () {
        return {
            selectedRowKeys: [],
            columns: [
                {
                    title: '规则编号',
                    dataIndex: 'barcode'
                },
                {
                    title: '名称',
                    dataIndex: 'name'
                },
                {
                    title: '价格',
                    dataIndex: 'price'
                }
            ],
            loadData: () => {
                return new Promise(resolve => {
                    resolve({
                        data: [
                            {
                                id: '1234561',
                                name: '矿泉水 550ml',
                                barcode: '12421432143214321',
                                price: '2.00',
                                num: '1',
                                amount: '2.00'
                            },
                            {
                                id: '1234562',
                                name: '凉茶 300ml',
                                barcode: '12421432143214322',
                                price: '3.00',
                                num: '2',
                                amount: '6.00'
                            },
                            {
                                id: '1234563',
                                name: '好吃的薯片',
                                barcode: '12421432143214323',
                                price: '7.00',
                                num: '4',
                                amount: '28.00'
                            },
                            {
                                id: '1234564',
                                name: '特别好吃的蛋卷',
                                barcode: '12421432143214324',
                                price: '8.50',
                                num: '3',
                                amount: '25.50'
                            }
                        ],
                        pageSize: 10,
                        pageNo: 1,
                        totalPage: 1,
                        totalCount: 10
                    })
                }).then(res => {
                    return res
                })
            }
        }
    },
    methods: {
        onSelectChange (e) {
            console.log(e)
        }
    }
}
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
