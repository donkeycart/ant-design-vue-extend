// chart
import Bar from './Charts/Bar'
import ChartCard from './Charts/ChartCard'
import Liquid from './Charts/Liquid'
import MiniArea from './Charts/MiniArea'
import MiniSmoothArea from './Charts/MiniSmoothArea'
import MiniBar from './Charts/MiniBar'
import MiniProgress from './Charts/MiniProgress'
import Radar from './Charts/Radar'
import RankList from './Charts/RankList'
import TransferBar from './Charts/TransferBar'
import TagCloud from './Charts/TagCloud'

// pro components
import AvatarList from './AvatarList'
import CountDown from './CountDown'
import Ellipsis from './Ellipsis'
import FooterToolbar from './FooterToolbar'
import NumberInfo from './NumberInfo'
import DetailList from './DetailList'
import Tree from './Tree/Tree'
import Trend from './Trend'
import STable from './Table'
import MultiTab from './MultiTab'
import Result from './Result'
import IconSelector from './IconSelector'
import TagSelect from './TagSelect'
import StandardFormRow from './StandardFormRow'
import ArticleListContent from './ArticleListContent'

const components = [
    AvatarList,
    Bar,
    ChartCard,
    Liquid,
    MiniArea,
    MiniSmoothArea,
    MiniBar,
    MiniProgress,
    Radar,
    TagCloud,
    RankList,
    TransferBar,
    Trend,
    CountDown,
    Ellipsis,
    FooterToolbar,
    NumberInfo,
    DetailList,
    Tree,
    STable,
    MultiTab,
    Result,
    IconSelector,
    TagSelect,
    StandardFormRow,
    ArticleListContent
]

const install = function (Vue) {
    if (install.installed) return
    components.forEach(component => {
        console.log(component.name)
        Vue.component(component.name, component)
    })
}

export default {
    install,
    AvatarList,
    Bar,
    ChartCard,
    Liquid,
    MiniArea,
    MiniSmoothArea,
    MiniBar,
    MiniProgress,
    Radar,
    TagCloud,
    RankList,
    TransferBar,
    Trend,
    CountDown,
    Ellipsis,
    FooterToolbar,
    NumberInfo,
    DetailList,
    Tree,
    STable,
    MultiTab,
    Result,
    IconSelector,
    TagSelect,
    StandardFormRow,
    ArticleListContent
}
