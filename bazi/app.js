const STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
const ELEMENTS = ["木", "火", "土", "金", "水"];
const STEM_ELEMENT = {
  甲: "木",
  乙: "木",
  丙: "火",
  丁: "火",
  戊: "土",
  己: "土",
  庚: "金",
  辛: "金",
  壬: "水",
  癸: "水"
};
const STEM_YINYANG = {
  甲: "阳",
  乙: "阴",
  丙: "阳",
  丁: "阴",
  戊: "阳",
  己: "阴",
  庚: "阳",
  辛: "阴",
  壬: "阳",
  癸: "阴"
};
const BRANCH_ELEMENT = {
  子: "水",
  丑: "土",
  寅: "木",
  卯: "木",
  辰: "土",
  巳: "火",
  午: "火",
  未: "土",
  申: "金",
  酉: "金",
  戌: "土",
  亥: "水"
};
const SOLAR_TERM_INFO = [0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758];
const MONTH_TERMS = [
  {index: 0, name: "小寒"}, {index: 2, name: "立春"}, {index: 4, name: "惊蛰"}, {index: 6, name: "清明"},
  {index: 8, name: "立夏"}, {index: 10, name: "芒种"}, {index: 12, name: "小暑"}, {index: 14, name: "立秋"},
  {index: 16, name: "白露"}, {index: 18, name: "寒露"}, {index: 20, name: "立冬"}, {index: 22, name: "大雪"}
];
const MONTH_BRANCH_BY_TERM = {
  2: "寅", 4: "卯", 6: "辰", 8: "巳", 10: "午", 12: "未",
  14: "申", 16: "酉", 18: "戌", 20: "亥", 22: "子", 0: "丑"
};
const SOLAR_MONTH_BRANCHES = ["寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥", "子", "丑"];
const TIGER_MONTH_STEM_BY_YEAR_STEM = {
  甲: "丙", 己: "丙", 乙: "戊", 庚: "戊", 丙: "庚", 辛: "庚", 丁: "壬", 壬: "壬", 戊: "甲", 癸: "甲"
};
const FORM = document.querySelector("#chartForm");
const $ = (selector) => document.querySelector(selector);
const ARCHIVE_KEY = "bazi-chart-archive-v1";
const ARCHIVE_API_BASE_URL = window.API_BASE_URL || window.SIGN_API_BASE_URL || (window.SIGN_API_URL ? window.SIGN_API_URL.replace(/\/sign\/?$/, "") : "https://mopu.top/api");
const LOGIN_PHONE_KEY = "qiyuan-login-phone";
const LOGIN_PRO_KEY = "qiyuan-login-pro";
const BAZI_ARCHIVE_SERVER_TYPE = "qimen";
let serverArchiveRecords = [];
let chartState = null;
let selectedCalendar = "solar";
let querySelectMode = false;
const selectedQueryIds = new Set();
const hiddenQueryIds = new Set();
const pillarCache = new Map();
let duiyuanApplyOpen = false;
let duiyuanCatalogState = null;
let currentPage = "input";
let previousPage = "input";
const DUIYUAN_BRANCH_ORDER = ["午", "未", "申", "酉", "戌", "亥", "子", "丑", "寅", "卯", "辰", "巳"];
let duiyuanState = {category: "六合", branch: "子"};
const membershipLevel = () => {
  const level = Number(localStorage.getItem(LOGIN_PRO_KEY));
  return level === 1 || level === 2 ? level : 0;
};

function serverPlan() {
  const plan = chartState?.viewer?.plan;
  return ["basic", "advanced", "professional"].includes(plan) ? plan : null;
}

const hasAdvancedRights = () => chartState?.professional?.hiddenStemScores?.status ? hasHiddenStemScores() : serverPlan() ? serverPlan() !== "basic" : membershipLevel() >= 1;
const hasProfessionalRights = () => chartState?.professional?.fortuneScores?.status ? hasFortuneScores() : serverPlan() ? serverPlan() === "professional" : membershipLevel() >= 2;
const hasHiddenStemScores = () => chartState?.professional?.hiddenStemScores?.status === "available";
const hasFortuneScores = () => chartState?.professional?.fortuneScores?.status === "available";
function updateMemberFooter() {
  const level = membershipLevel();
  const names = ["基础版", "高级版", "专业版"];
  const notes = ["免费使用", "高级会员", "专业会员"];
  $("#memberFooterLevel").textContent = names[level];
  $("#memberFooterNote").textContent = notes[level];
}
const REGION_LONGITUDE = {
  北京市: {北京市: 116.4074},
  天津市: {天津市: 117.2000},
  上海市: {上海市: 121.4737},
  重庆市: {重庆市: 106.5516},
  河北省: {
    石家庄市: 114.5149,
    唐山市: 118.1802,
    秦皇岛市: 119.6005,
    邯郸市: 114.5391,
    邢台市: 114.5048,
    保定市: 115.4646,
    张家口市: 114.8875,
    承德市: 117.9627,
    沧州市: 116.8388,
    廊坊市: 116.6838,
    衡水市: 115.6702
  },
  山西省: {
    太原市: 112.5489,
    大同市: 113.3001,
    阳泉市: 113.5804,
    长治市: 113.1163,
    晋城市: 112.8513,
    朔州市: 112.4329,
    晋中市: 112.7527,
    运城市: 111.0075,
    忻州市: 112.7342,
    临汾市: 111.5190,
    吕梁市: 111.1445
  },
  内蒙古自治区: {
    呼和浩特市: 111.7492,
    包头市: 109.8403,
    乌海市: 106.8256,
    赤峰市: 118.8869,
    通辽市: 122.2434,
    鄂尔多斯市: 109.7813,
    呼伦贝尔市: 119.7658,
    巴彦淖尔市: 107.3877,
    乌兰察布市: 113.1326,
    兴安盟: 122.0670,
    锡林郭勒盟: 116.0477,
    阿拉善盟: 105.7287
  },
  辽宁省: {
    沈阳市: 123.4315,
    大连市: 121.6147,
    鞍山市: 122.9956,
    抚顺市: 123.9572,
    本溪市: 123.6851,
    丹东市: 124.3547,
    锦州市: 121.1270,
    营口市: 122.2191,
    阜新市: 121.6701,
    辽阳市: 123.1815,
    盘锦市: 122.0707,
    铁岭市: 123.7260,
    朝阳市: 120.4504,
    葫芦岛市: 120.8369
  },
  吉林省: {
    长春市: 125.3235,
    吉林市: 126.5496,
    四平市: 124.3504,
    辽源市: 125.1437,
    通化市: 125.9397,
    白山市: 126.4147,
    松原市: 124.8253,
    白城市: 122.8390,
    延边朝鲜族自治州: 129.5132
  },
  黑龙江省: {
    哈尔滨市: 126.6425,
    齐齐哈尔市: 123.9182,
    鸡西市: 130.9693,
    鹤岗市: 130.2979,
    双鸭山市: 131.1591,
    大庆市: 125.1031,
    伊春市: 128.8405,
    佳木斯市: 130.3189,
    七台河市: 131.0031,
    牡丹江市: 129.6332,
    黑河市: 127.5282,
    绥化市: 126.9689,
    大兴安岭地区: 124.1178
  },
  江苏省: {
    南京市: 118.7969,
    无锡市: 120.3124,
    徐州市: 117.2841,
    常州市: 119.9741,
    苏州市: 120.5853,
    南通市: 120.8943,
    连云港市: 119.2216,
    淮安市: 119.0153,
    盐城市: 120.1636,
    扬州市: 119.4129,
    镇江市: 119.4250,
    泰州市: 119.9231,
    宿迁市: 118.2752
  },
  浙江省: {
    杭州市: 120.1551,
    宁波市: 121.5503,
    温州市: 120.6994,
    嘉兴市: 120.7555,
    湖州市: 120.0869,
    绍兴市: 120.5802,
    金华市: 119.6474,
    衢州市: 118.8593,
    舟山市: 122.2072,
    台州市: 121.4208,
    丽水市: 119.9233
  },
  安徽省: {
    合肥市: 117.2272,
    芜湖市: 118.4331,
    蚌埠市: 117.3893,
    淮南市: 117.0186,
    马鞍山市: 118.5061,
    淮北市: 116.7983,
    铜陵市: 117.8121,
    安庆市: 117.0637,
    黄山市: 118.3375,
    滁州市: 118.3163,
    阜阳市: 115.8142,
    宿州市: 116.9841,
    六安市: 116.5219,
    亳州市: 115.7786,
    池州市: 117.4914,
    宣城市: 118.7587
  },
  福建省: {
    福州市: 119.2965,
    厦门市: 118.0894,
    莆田市: 119.0077,
    三明市: 117.6389,
    泉州市: 118.6759,
    漳州市: 117.6473,
    南平市: 118.1777,
    龙岩市: 117.0170,
    宁德市: 119.5479
  },
  江西省: {
    南昌市: 115.8582,
    景德镇市: 117.1784,
    萍乡市: 113.8543,
    九江市: 116.0019,
    新余市: 114.9173,
    鹰潭市: 117.0692,
    赣州市: 114.9403,
    吉安市: 114.9668,
    宜春市: 114.4168,
    抚州市: 116.3581,
    上饶市: 117.9436
  },
  山东省: {
    济南市: 117.1201,
    青岛市: 120.3826,
    淄博市: 118.0548,
    枣庄市: 117.3237,
    东营市: 118.6747,
    烟台市: 121.4479,
    潍坊市: 119.1618,
    济宁市: 116.5871,
    泰安市: 117.0876,
    威海市: 122.1204,
    日照市: 119.5269,
    临沂市: 118.3564,
    德州市: 116.3575,
    聊城市: 115.9854,
    滨州市: 117.9707,
    菏泽市: 115.4807
  },
  河南省: {
    郑州市: 113.6254,
    开封市: 114.3076,
    洛阳市: 112.4536,
    平顶山市: 113.1926,
    安阳市: 114.3924,
    鹤壁市: 114.2974,
    新乡市: 113.9268,
    焦作市: 113.2418,
    濮阳市: 115.0292,
    许昌市: 113.8526,
    漯河市: 114.0168,
    三门峡市: 111.2003,
    南阳市: 112.5285,
    商丘市: 115.6563,
    信阳市: 114.0913,
    周口市: 114.6969,
    驻马店市: 114.0223,
    济源市: 112.6023
  },
  湖北省: {
    武汉市: 114.3055,
    黄石市: 115.0389,
    十堰市: 110.7989,
    宜昌市: 111.2865,
    襄阳市: 112.1224,
    鄂州市: 114.8949,
    荆门市: 112.1994,
    孝感市: 113.9569,
    荆州市: 112.2397,
    黄冈市: 114.8723,
    咸宁市: 114.3225,
    随州市: 113.3826,
    恩施土家族苗族自治州: 109.4882,
    仙桃市: 113.4545,
    潜江市: 112.8993,
    天门市: 113.1661,
    神农架林区: 110.6759
  },
  湖南省: {
    长沙市: 112.9388,
    株洲市: 113.1340,
    湘潭市: 112.9441,
    衡阳市: 112.5720,
    邵阳市: 111.4677,
    岳阳市: 113.1292,
    常德市: 111.6985,
    张家界市: 110.4784,
    益阳市: 112.3552,
    郴州市: 113.0147,
    永州市: 111.6134,
    怀化市: 109.9985,
    娄底市: 112.0085,
    湘西土家族苗族自治州: 109.7397
  },
  广东省: {
    广州市: 113.2644,
    韶关市: 113.5975,
    深圳市: 114.0579,
    珠海市: 113.5767,
    汕头市: 116.6822,
    佛山市: 113.1214,
    江门市: 113.0815,
    湛江市: 110.3594,
    茂名市: 110.9255,
    肇庆市: 112.4650,
    惠州市: 114.4168,
    梅州市: 116.1226,
    汕尾市: 115.3753,
    河源市: 114.7007,
    阳江市: 111.9834,
    清远市: 113.0560,
    东莞市: 113.7518,
    中山市: 113.3928,
    潮州市: 116.6219,
    揭阳市: 116.3727,
    云浮市: 112.0445
  },
  广西壮族自治区: {
    南宁市: 108.3669,
    柳州市: 109.4281,
    桂林市: 110.2900,
    梧州市: 111.2792,
    北海市: 109.1202,
    防城港市: 108.3547,
    钦州市: 108.6541,
    贵港市: 109.5989,
    玉林市: 110.1647,
    百色市: 106.6182,
    贺州市: 111.5667,
    河池市: 108.0854,
    来宾市: 109.2214,
    崇左市: 107.3649
  },
  海南省: {海口市: 110.1983, 三亚市: 109.5119, 三沙市: 112.3386, 儋州市: 109.5808},
  四川省: {
    成都市: 104.0665,
    自贡市: 104.7784,
    攀枝花市: 101.7186,
    泸州市: 105.4423,
    德阳市: 104.3979,
    绵阳市: 104.6791,
    广元市: 105.8434,
    遂宁市: 105.5929,
    内江市: 105.0584,
    乐山市: 103.7654,
    南充市: 106.1107,
    眉山市: 103.8485,
    宜宾市: 104.6432,
    广安市: 106.6333,
    达州市: 107.4679,
    雅安市: 103.0133,
    巴中市: 106.7475,
    资阳市: 104.6276,
    阿坝藏族羌族自治州: 102.2247,
    甘孜藏族自治州: 101.9638,
    凉山彝族自治州: 102.2677
  },
  贵州省: {
    贵阳市: 106.6302,
    六盘水市: 104.8304,
    遵义市: 106.9274,
    安顺市: 105.9476,
    毕节市: 105.2916,
    铜仁市: 109.1895,
    黔西南布依族苗族自治州: 104.9064,
    黔东南苗族侗族自治州: 107.9828,
    黔南布依族苗族自治州: 107.5223
  },
  云南省: {
    昆明市: 102.8329,
    曲靖市: 103.7962,
    玉溪市: 102.5466,
    保山市: 99.1618,
    昭通市: 103.7175,
    丽江市: 100.2271,
    普洱市: 100.9662,
    临沧市: 100.0888,
    楚雄彝族自治州: 101.5281,
    红河哈尼族彝族自治州: 103.3748,
    文山壮族苗族自治州: 104.2157,
    西双版纳傣族自治州: 100.7974,
    大理白族自治州: 100.2676,
    德宏傣族景颇族自治州: 98.5849,
    怒江傈僳族自治州: 98.8566,
    迪庆藏族自治州: 99.7068
  },
  西藏自治区: {
    拉萨市: 91.1172,
    日喀则市: 88.8851,
    昌都市: 97.1720,
    林芝市: 94.3615,
    山南市: 91.7731,
    那曲市: 92.0515,
    阿里地区: 80.1058
  },
  陕西省: {
    西安市: 108.9398,
    铜川市: 108.9452,
    宝鸡市: 107.2377,
    咸阳市: 108.7088,
    渭南市: 109.5098,
    延安市: 109.4897,
    汉中市: 107.0232,
    榆林市: 109.7346,
    安康市: 109.0293,
    商洛市: 109.9405
  },
  甘肃省: {
    兰州市: 103.8343,
    嘉峪关市: 98.2892,
    金昌市: 102.1880,
    白银市: 104.1389,
    天水市: 105.7249,
    武威市: 102.6378,
    张掖市: 100.4498,
    平凉市: 106.6649,
    酒泉市: 98.4943,
    庆阳市: 107.6436,
    定西市: 104.6252,
    陇南市: 104.9217,
    临夏回族自治州: 103.2105,
    甘南藏族自治州: 102.9110
  },
  青海省: {
    西宁市: 101.7782,
    海东市: 102.1033,
    海北藏族自治州: 100.9009,
    黄南藏族自治州: 102.0152,
    海南藏族自治州: 100.6204,
    果洛藏族自治州: 100.2448,
    玉树藏族自治州: 97.0065,
    海西蒙古族藏族自治州: 97.3712
  },
  宁夏回族自治区: {银川市: 106.2309, 石嘴山市: 106.3842, 吴忠市: 106.1986, 固原市: 106.2426, 中卫市: 105.1968},
  新疆维吾尔自治区: {
    乌鲁木齐市: 87.6168,
    克拉玛依市: 84.8892,
    吐鲁番市: 89.1895,
    哈密市: 93.5151,
    昌吉回族自治州: 87.3082,
    博尔塔拉蒙古自治州: 82.0664,
    巴音郭楞蒙古自治州: 86.1509,
    阿克苏地区: 80.2606,
    克孜勒苏柯尔克孜自治州: 76.1678,
    喀什地区: 75.9898,
    和田地区: 79.9222,
    伊犁哈萨克自治州: 81.3241,
    塔城地区: 82.9803,
    阿勒泰地区: 88.1413,
    石河子市: 86.0806
  },
  香港特别行政区: {香港特别行政区: 114.1694},
  澳门特别行政区: {澳门特别行政区: 113.5439},
  台湾省: {
    台北市: 121.5654,
    新北市: 121.4657,
    桃园市: 121.3000,
    台中市: 120.6736,
    台南市: 120.2270,
    高雄市: 120.3014,
    基隆市: 121.7415,
    新竹市: 120.9688,
    嘉义市: 120.4491
  }
};

function toTimeIndex(time) {
  const hour = Number(time.split(":")[0]);
  if (hour >= 23) return 12;
  if (hour < 1) return 0;
  return Math.floor((hour + 1) / 2);
}

function normalizeDate(date) {
  const [year, month, day] = date.split("-").map(Number);
  return `${year}-${month}-${day}`;
}

function callCalendar(date, timeIndex, sex, calendar, leapMonth, useLeapMonth) {
  if (!window.iztro || !window.iztro.astro) {
    throw new Error("iztro 万年历没有加载成功，请检查网络或 CDN。");
  }

  const astro = window.iztro.astro;
  const safeDate = normalizeDate(date);
  const englishSex = sex === "男" ? "male" : "female";

  if (calendar === "solar") {
    if (typeof astro.bySolar === "function") return astro.bySolar(safeDate, timeIndex, sex, useLeapMonth, "zh-CN");
    return astro.astrolabeBySolarDate(safeDate, timeIndex, englishSex, useLeapMonth, "zh-CN");
  }

  if (typeof astro.byLunar === "function") return astro.byLunar(safeDate, timeIndex, sex, leapMonth, useLeapMonth, "zh-CN");
  return astro.astrolabeByLunarDate(safeDate, timeIndex, englishSex, leapMonth, useLeapMonth, "zh-CN");
}

function splitPillars(chineseDate) {
  return chineseDate.trim().split(/\s+/).map((text) => ({text, stem: text[0], branch: text[1]}));
}

function pillarFromText(text, label, meta = "") {
  return {text, stem: text[0], branch: text[1], label, meta};
}

function buildGanzhiPillars(date, time, fallbackPillars) {
  const born = birthDateTime(date, time);
  const lichun = solarTermDate(born.getFullYear(), 2);
  const ganzhiYearNumber = born >= lichun ? born.getFullYear() : born.getFullYear() - 1;
  const yearPillar = pillarFromText(ganzhiYear(ganzhiYearNumber), "年柱");
  const monthTerm = [born.getFullYear() - 1, born.getFullYear(), born.getFullYear() + 1]
    .flatMap((year) => MONTH_TERMS.map((term) => ({
      ...term,
      year,
      date: solarTermDate(year, term.index)
    })))
    .filter((term) => term.date <= born)
    .sort((a, b) => b.date - a.date)[0];
  const monthPillar = pillarFromText(monthPillarByTerm(ganzhiYearNumber, monthTerm.index), "月柱");
  return [yearPillar, monthPillar, fallbackPillars[2], fallbackPillars[3]];
}

function elementClass(element) {
  return `el-${element}`;
}

function stemClass(stem) {
  return elementClass(STEM_ELEMENT[stem]);
}

function branchClass(branch) {
  return elementClass(BRANCH_ELEMENT[branch]);
}

function nextGanzhi(text, step) {
  const stemIndex = STEMS.indexOf(text[0]);
  const branchIndex = BRANCHES.indexOf(text[1]);
  return STEMS[(stemIndex + step + 120) % 10] + BRANCHES[(branchIndex + step + 120) % 12];
}

function ganzhiYear(year) {
  return STEMS[(year - 4) % 10] + BRANCHES[(year - 4) % 12];
}

function monthPillarByTerm(year, termIndex) {
  const branch = MONTH_BRANCH_BY_TERM[termIndex];
  const tigerStem = TIGER_MONTH_STEM_BY_YEAR_STEM[ganzhiYear(year)[0]];
  const offset = SOLAR_MONTH_BRANCHES.indexOf(branch);
  return STEMS[(STEMS.indexOf(tigerStem) + offset + 120) % 10] + branch;
}

function solarDateValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function solarMonthDay(date) {
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function fortuneDirection(yearStem, sex) {
  const isYangYear = STEM_YINYANG[yearStem] === "阳";
  return (isYangYear && sex === "男") || (!isYangYear && sex === "女") ? 1 : -1;
}

function solarTermDate(year, termIndex) {
  const base = Date.UTC(1900, 0, 6, 2, 5);
  return new Date(base + 31556925974.7 * (year - 1900) + SOLAR_TERM_INFO[termIndex] * 60000);
}

function monthTermsAround(year) {
  return [year - 1, year, year + 1].flatMap((termYear) => MONTH_TERMS.map((term) => ({
    name: term.name,
    date: solarTermDate(termYear, term.index)
  }))).sort((a, b) => a.date - b.date);
}

function birthDateTime(date, time) {
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  return new Date(year, month - 1, day, hour, minute || 0);
}

function dateValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function timeValue(date) {
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  return `${hour}:${minute}`;
}

function dateTimeValue(date) {
  return `${dateValue(date)} ${timeValue(date)}`;
}

function roundToNearestMinute(date) {
  return new Date(Math.round(date.getTime() / 60000) * 60000);
}

function dayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  return Math.floor((date - start) / 86400000);
}

function equationOfTimeMinutes(date) {
  const theta = (2 * Math.PI * (dayOfYear(date) - 1)) / 365;
  return 229.18 * (
    0.000075 +
    0.001868 * Math.cos(theta) -
    0.032077 * Math.sin(theta) -
    0.014615 * Math.cos(2 * theta) -
    0.040849 * Math.sin(2 * theta)
  );
}

function resolveLongitude(province, city) {
  if (!province || !city) throw new Error("请先选择出生省份和出生城市。");
  const longitude = REGION_LONGITUDE[province]?.[city];
  if (!Number.isFinite(longitude)) throw new Error("未找到该城市经度，请重新选择出生地。");
  return {longitude, source: `${province}${city}`};
}

function toTrueSolar(date, time, province, city) {
  const geo = resolveLongitude(province, city);
  const beijingTime = birthDateTime(date, time);
  const longitudeOffset = (geo.longitude - 120) * 4;
  const meanSolarTime = new Date(beijingTime.getTime() + longitudeOffset * 60000);
  const equationOffset = equationOfTimeMinutes(meanSolarTime);
  const trueSolarTime = new Date(meanSolarTime.getTime() + equationOffset * 60000);
  const roundedMeanSolarTime = roundToNearestMinute(meanSolarTime);
  const roundedTrueSolarTime = roundToNearestMinute(trueSolarTime);
  const offsetMinutes = longitudeOffset + equationOffset;
  return {
    date: dateValue(roundedTrueSolarTime),
    time: timeValue(roundedTrueSolarTime),
    beijingText: dateTimeValue(beijingTime),
    meanSolarText: dateTimeValue(roundedMeanSolarTime),
    trueSolarText: dateTimeValue(roundedTrueSolarTime),
    longitude: geo.longitude,
    source: geo.source,
    longitudeOffset,
    equationOffset,
    offsetMinutes
  };
}

function solarDateFromLunarAstrolabe(astrolabe) {
  const candidates = [astrolabe.solarDate, astrolabe.solarDateStr, astrolabe.solarDateString, astrolabe.solar];
  const solarDate = candidates.find((item) => /^\d{4}-\d{1,2}-\d{1,2}$/.test(String(item || "")));
  if (!solarDate) throw new Error("当前万年历没有返回农历对应的公历日期，请先使用公历排盘。");
  return solarDate;
}

function initRegionSelects() {
  const provinceSelect = $("#birthProvince");
  const citySelect = $("#birthCity");
  const pickProvince = $("#pickProvince");
  const pickCity = $("#pickCity");
  const provinceOptions = `<option value="">请选择</option>` + Object.keys(REGION_LONGITUDE)
    .map((province) => `<option value="${province}">${province}</option>`)
    .join("");
  provinceSelect.innerHTML = provinceOptions;
  pickProvince.innerHTML = provinceOptions;

  function cityOptions(province) {
    if (!province) {
      return `<option value="">请选择</option>`;
    }
    return `<option value="">请选择</option>` + Object.keys(REGION_LONGITUDE[province])
      .map((city) => `<option value="${city}">${city}</option>`)
      .join("");
  }

  function fillCities() {
    citySelect.innerHTML = cityOptions(provinceSelect.value);
  }

  function fillPickCities() {
    pickCity.innerHTML = cityOptions(pickProvince.value);
  }

  fillCities();
  fillPickCities();
  provinceSelect.addEventListener("change", fillCities);
  pickProvince.addEventListener("change", fillPickCities);
}

function pad2(value) {
  return String(value).padStart(2, "0");
}

const MANUAL_MIN_YEAR = 1000;
const MANUAL_MAX_YEAR = 9999;
const PICKER_MIN_YEAR = 1900;
const PICKER_MAX_YEAR = 2100;

function parseManualDateTime(value) {
  const text = String(value || "").trim().replace("T", " ");
  if (!text) return null;
  const match = /^(\d{4})-(\d{1,2})-(\d{1,2})\s+(\d{1,2}):(\d{1,2})$/.exec(text);
  if (!match) throw new Error("手动时间格式请填写为：1000-01-01 00:00。");
  const [year, month, day, hour, minute] = match.slice(1).map(Number);
  if (year < MANUAL_MIN_YEAR || year > MANUAL_MAX_YEAR) throw new Error("手动输入年份范围为 1000-9999 年。");
  if (month < 1 || month > 12) throw new Error("请输入正确的月份。");
  if (day < 1 || day > daysInMonth(year, month)) throw new Error("请输入正确的日期。");
  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) throw new Error("请输入正确的时间。");
  return {
    date: `${year}-${pad2(month)}-${pad2(day)}`,
    time: `${pad2(hour)}:${pad2(minute)}`
  };
}

function validateManualDate(date) {
  const [year, month, day] = String(date || "").split("-").map(Number);
  if (!year || year < MANUAL_MIN_YEAR || year > MANUAL_MAX_YEAR) throw new Error("出生年份范围为 1000-9999 年。");
  if (month < 1 || month > 12 || day < 1 || day > daysInMonth(year, month)) throw new Error("出生日期不正确。");
}

function daysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

function fillNumberSelect(select, start, end, value) {
  select.innerHTML = Array.from({length: end - start + 1}, (_, index) => {
    const item = start + index;
    const text = select.id === "pickYear" ? String(item) : pad2(item);
    return `<option value="${item}"${item === value ? " selected" : ""}>${text}</option>`;
  }).join("");
}

function syncPickerDays() {
  const year = Number($("#pickYear").value);
  const month = Number($("#pickMonth").value);
  const oldDay = Number($("#pickDay").value) || 1;
  fillNumberSelect($("#pickDay"), 1, daysInMonth(year, month), Math.min(oldDay, daysInMonth(year, month)));
}

function initDateTimePicker() {
  const now = new Date();
  fillNumberSelect($("#pickYear"), PICKER_MIN_YEAR, PICKER_MAX_YEAR, now.getFullYear());
  fillNumberSelect($("#pickMonth"), 1, 12, now.getMonth() + 1);
  fillNumberSelect($("#pickDay"), 1, daysInMonth(now.getFullYear(), now.getMonth() + 1), now.getDate());
  fillNumberSelect($("#pickHour"), 0, 23, now.getHours());
  fillNumberSelect($("#pickMinute"), 0, 59, now.getMinutes());
  $("#pickYear").addEventListener("change", syncPickerDays);
  $("#pickMonth").addEventListener("change", syncPickerDays);
}

function setPickerFromCurrentValue() {
  const date = $("#birthDate").value;
  const time = $("#birthTime").value;
  const base = date && time ? birthDateTime(date, time) : new Date();
  $("#manualDateTime").value = date && time ? `${date} ${time}` : "";
  const pickerYear = Math.min(PICKER_MAX_YEAR, Math.max(PICKER_MIN_YEAR, base.getFullYear()));
  $("#pickYear").value = String(pickerYear);
  $("#pickMonth").value = String(base.getMonth() + 1);
  syncPickerDays();
  $("#pickDay").value = String(base.getDate());
  $("#pickHour").value = String(base.getHours());
  $("#pickMinute").value = String(base.getMinutes());
}

function openLayer(selector) {
  const layer = $(selector);
  const panel = layer.querySelector(".picker-panel");
  const width = Math.min(420, window.innerWidth - 24);
  panel.style.width = `${width}px`;
  panel.style.left = "50%";
  panel.style.top = "50%";
  layer.classList.remove("hidden");
}

function closeLayer(selector) {
  $(selector).classList.add("hidden");
}

function showPage(page, options = {}) {
  if (!options.keepPrevious) previousPage = currentPage;
  currentPage = page;
  $("#editPanel").classList.toggle("open", page === "input");
  $("#resultArea").classList.toggle("hidden", page !== "chart");
  $("#queryPage").classList.toggle("hidden", page !== "query");
  $("#duiyuanPage").classList.toggle("hidden", page !== "duiyuan");
  $("#paywallPage").classList.toggle("hidden", page !== "paywall");
  document.body.classList.toggle("has-chart", page === "chart");
  document.body.classList.toggle("editing", page === "input");
  document.body.dataset.page = page;
  if (page === "chart") updateMemberFooter();
}

function clearHomeForm() {
  $("#personName").value = "";
  $("#birthDate").value = "";
  $("#birthTime").value = "";
  $("#birthProvince").value = "";
  $("#birthProvince").dispatchEvent(new Event("change"));
  $("#birthCity").value = "";
  $("#openTimePicker").textContent = "请选择";
  $("#openPlacePicker").textContent = "请选择";
  $("#errorText").textContent = "";
}

function initEntryInteractions() {
  document.querySelectorAll(".gender-card").forEach((button) => {
    button.addEventListener("click", () => {
      $("#gender").value = button.dataset.gender;
      document.querySelectorAll(".gender-card").forEach((item) => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", active ? "true" : "false");
      });
    });
  });

  document.querySelectorAll(".calendar-toggle button").forEach((button) => {
    button.addEventListener("click", () => {
      selectedCalendar = button.dataset.calendar;
      document.querySelectorAll(".calendar-toggle button").forEach((item) => item.classList.toggle("active", item === button));
    });
  });

  $("#openTimePicker").addEventListener("click", () => {
    setPickerFromCurrentValue();
    openLayer("#timePicker");
  });
  $("#clearManualDateTime").addEventListener("click", () => {
    $("#manualDateTime").value = "";
    $("#manualDateTime").focus();
  });
  $("#cancelTimePicker").addEventListener("click", () => closeLayer("#timePicker"));
  $("#clearTimePicker").addEventListener("click", () => {
    $("#birthDate").value = "";
    $("#birthTime").value = "";
    $("#manualDateTime").value = "";
    $("#openTimePicker").textContent = "请选择";
    closeLayer("#timePicker");
  });
  $("#confirmTimePicker").addEventListener("click", () => {
    try {
      const manual = parseManualDateTime($("#manualDateTime").value);
      const date = manual?.date || `${$("#pickYear").value}-${pad2($("#pickMonth").value)}-${pad2($("#pickDay").value)}`;
      const time = manual?.time || `${pad2($("#pickHour").value)}:${pad2($("#pickMinute").value)}`;
      $("#birthDate").value = date;
      $("#birthTime").value = time;
      $("#openTimePicker").textContent = `${date} ${time}`;
      closeLayer("#timePicker");
    } catch (error) {
      $("#errorText").textContent = error.message || "请输入正确的出生时辰。";
    }
  });

  $("#openPlacePicker").addEventListener("click", () => {
    $("#pickProvince").value = $("#birthProvince").value;
    $("#pickProvince").dispatchEvent(new Event("change"));
    $("#pickCity").value = $("#birthCity").value;
    openLayer("#placePicker");
  });
  $("#cancelPlacePicker").addEventListener("click", () => closeLayer("#placePicker"));
  $("#confirmPlacePicker").addEventListener("click", () => {
    $("#birthProvince").value = $("#pickProvince").value;
    $("#birthProvince").dispatchEvent(new Event("change"));
    $("#birthCity").value = $("#pickCity").value;
    const text = $("#birthProvince").value && $("#birthCity").value ? `${$("#birthProvince").value}${$("#birthCity").value}` : "请选择";
    $("#openPlacePicker").textContent = text;
    closeLayer("#placePicker");
  });

  $("#archiveChart").addEventListener("click", saveCurrentChart);
  $("#openQueryPage").addEventListener("click", openQueryPage);
  $("#clearHomeForm").addEventListener("click", clearHomeForm);
  $("#openQueryHome").addEventListener("click", openQueryPage);
  $("#closeQueryPage").addEventListener("click", closeQueryPage);
  $("#queryDeleteTop").addEventListener("click", deleteSelectedQueryItems);
  $("#toggleQuerySelect").addEventListener("click", toggleQuerySelectMode);
  let querySearchTimer = 0;
  $("#querySearch").addEventListener("input", () => {
    window.clearTimeout(querySearchTimer);
    querySearchTimer = window.setTimeout(() => {
      loadBaziArchiveRecords($("#querySearch").value.trim()).catch((error) => {
        $("#queryList").innerHTML = `<p class="query-empty">${error.message || "查询存档失败"}</p>`;
      });
    }, 250);
  });
  $("#clearQuerySearch").addEventListener("click", () => {
    $("#querySearch").value = "";
    loadBaziArchiveRecords("").catch((error) => {
      $("#queryList").innerHTML = `<p class="query-empty">${error.message || "查询存档失败"}</p>`;
    });
  });
  $("#duiyuanButton").addEventListener("click", openDuiyuanPage);
  $("#closeDuiyuanPage").addEventListener("click", closeDuiyuanPage);
  $("#closePaywallPage").addEventListener("click", closePaywallPage);
  $("#upgradeMember").addEventListener("click", openPaywallPage);
  document.querySelectorAll("[data-paywall-action]").forEach((button) => button.addEventListener("click", () => {
    if (button.dataset.paywallAction === "free") closePaywallPage();
    else $("#paywallNotice").textContent = "在线开通暂未接入，请稍后再试。";
  }));
  $("#toggleDuiyuanApply").addEventListener("click", toggleDuiyuanApply);
}

function luckStartInfo(date, time, direction) {
  const born = birthDateTime(date, time);
  const terms = monthTermsAround(born.getFullYear());
  const target = direction === 1
    ? terms.find((term) => term.date > born)
    : terms.filter((term) => term.date < born).pop();
  const diffDays = Math.abs(target.date - born) / 86400000;
  const totalMonths = Math.round(diffDays * 4);
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const startDate = new Date(born);
  startDate.setMonth(startDate.getMonth() + totalMonths);
  return {term: target.name, years, months, startYear: startDate.getFullYear(), startDate};
}

function formatStartAge(info) {
  const parts = [];
  if (info.years) parts.push(`${info.years}年`);
  if (info.months) parts.push(`${info.months}个月`);
  if (!parts.length) parts.push("0个月");
  return parts.join("");
}

function pillarBySolarDate(date, index = 2, timeIndex = 6) {
  const key = `${solarDateValue(date)}-${timeIndex}`;
  if (pillarCache.has(key)) return pillarCache.get(key)[index].text;
  const astrolabe = callCalendar(solarDateValue(date), timeIndex, "男", "solar", false, true);
  const pillars = splitPillars(astrolabe.chineseDate);
  pillarCache.set(key, pillars);
  return pillars[index].text;
}

function renderProfile(astrolabe, values) {
  $("#showName").textContent = values.name || "--";
  $("#showGender").textContent = values.sex;
  $("#showPlace").textContent = values.place || `${values.province || ""}${values.city || ""}` || "北京时间";
  $("#showSolar").textContent = `${values.clockSolarDate || values.date} ${values.time}`;
  $("#trueSolarLine").classList.toggle("hidden", !values.trueSolar);
  $("#solarCalcLine").classList.toggle("hidden", !values.trueSolar);
  if (values.trueSolar) {
    const longitudeOffset = Number(values.trueSolar.longitudeOffset ?? 0);
    const equationOffset = Number(values.trueSolar.equationOffset ?? 0);
    $("#showTrueSolar").textContent = values.trueSolar.trueSolarText;
    $("#showSolarCalc").textContent = `北京时间 ${values.trueSolar.beijingText} → 当地平太阳时 ${values.trueSolar.meanSolarText}（经度修正 ${longitudeOffset >= 0 ? "+" : ""}${longitudeOffset.toFixed(1)}分钟）→ 真太阳时 ${values.trueSolar.trueSolarText}（均时差 ${equationOffset >= 0 ? "+" : ""}${equationOffset.toFixed(1)}分钟）。`;
  }
  $("#showLunar").textContent = astrolabe.lunarDate || "--";
  $("#showHour").textContent = `${astrolabe.time || "--"} ${astrolabe.timeRange || ""}`.trim();
}

function currentArchiveRecord() {
  if (!chartState) return null;
  const {values, pillars} = chartState;
  return {
    id: `${values.clockSolarDate || values.date}-${values.time}-${values.name || "访客"}`,
    name: values.name || "姓名",
    date: values.clockSolarDate || values.date,
    time: values.time,
    chartDate: values.chartDate || values.clockSolarDate || values.date,
    chartTime: values.chartTime || values.time,
    province: values.province || "",
    city: values.city || "",
    place: values.place || `${values.province || ""}${values.city || ""}`,
    sex: values.sex,
    trueSolar: values.trueSolar || null,
    pillars: pillars.map((pillar) => pillar.text),
    savedAt: Date.now()
  };
}

function readArchiveRecords() {
  return serverArchiveRecords;
}

function writeArchiveRecords(records) {
  serverArchiveRecords = Array.isArray(records) ? records : [];
}

function archivePhone() {
  return localStorage.getItem(LOGIN_PHONE_KEY) || "";
}

function refreshArchivePermission() {
  const button = $("#archiveChart");
  const canSave = chartState?.archive?.canSave !== false;
  button.disabled = !canSave;
  button.textContent = canSave ? "存档" : "存档已满";
}

function showArchiveCallFeedback(message, isError = false) {
  let feedback = document.querySelector("#archiveCallFeedback");
  if (!feedback) {
    feedback = document.createElement("div");
    feedback.id = "archiveCallFeedback";
    feedback.className = "archive-call-feedback";
    feedback.setAttribute("role", "status");
    document.body.append(feedback);
  }
  feedback.textContent = message;
  feedback.classList.toggle("error", isError);
  feedback.classList.add("show");
  window.clearTimeout(showArchiveCallFeedback.timer);
  showArchiveCallFeedback.timer = window.setTimeout(() => feedback.classList.remove("show"), 1800);
}

async function baziArchiveApi(path, method, params = {}) {
  const query = method === "GET" ? `?${new URLSearchParams(params).toString()}` : "";
  const response = await fetch(`${ARCHIVE_API_BASE_URL}${path}${query}`, {
    method,
    headers: method === "GET" ? undefined : {"Content-Type": "application/json"},
    body: method === "GET" ? undefined : JSON.stringify(params)
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || (payload.status !== undefined && (Number(payload.status) < 200 || Number(payload.status) >= 300))) {
    const errorText = typeof payload.message === "string" ? payload.message : typeof payload.msg === "string" ? payload.msg : "存档服务返回异常。";
    throw new Error(errorText);
  }
  return payload.data ?? (typeof payload.msg === "object" ? payload.msg : null) ?? (typeof payload.message === "object" ? payload.message : null) ?? payload;
}

function unpackBaziArchiveRows(result) {
  const rows = Array.isArray(result) ? result : result?.records || result?.list || result?.rows || result?.data || [];
  return rows.map((item) => {
    let record = item?.record || {};
    if (typeof record === "string") {
      try {
        record = JSON.parse(record);
      } catch {
        record = {};
      }
    }
    return {
      ...record,
      id: String(item?.id ?? record.id),
      name: item?.name ?? record.name ?? ""
    };
  }).filter((record) => record.id && record.id !== "undefined" && record.id !== "null");
}

async function loadBaziArchiveRecords(name = "") {
  const result = await baziArchiveApi("/record", "GET", {
    phone: archivePhone(),
    type: BAZI_ARCHIVE_SERVER_TYPE,
    name,
    pageIndex: 1,
    pageSize: 5
  });
  writeArchiveRecords(unpackBaziArchiveRows(result));
  renderQueryList();
}

async function saveCurrentChart() {
  const record = currentArchiveRecord();
  if (!record) return;
  $("#archiveChart").disabled = true;
  try {
    await baziArchiveApi("/addRecord", "POST", {
      phone: archivePhone(),
      name: record.name,
      type: BAZI_ARCHIVE_SERVER_TYPE,
      record
    });
    $("#archiveChart").textContent = "已存档";
    showArchiveCallFeedback("存档成功");
  } catch (error) {
    $("#archiveChart").textContent = error.message || "存档失败";
    showArchiveCallFeedback(error.message || "存档失败", true);
  }
  window.setTimeout(() => {
    $("#archiveChart").textContent = "存档";
    $("#archiveChart").disabled = false;
  }, 1200);
}

function queryRecords() {
  return readArchiveRecords().filter((record) => !hiddenQueryIds.has(record.id)).map((record) => ({
    ...record,
    temporary: false
  }));
}

function renderQueryList() {
  const keyword = ($("#querySearch").value || "").trim();
  const records = queryRecords().filter((record) => {
    const haystack = String(record.name || "");
    return !keyword || haystack.includes(keyword);
  });
  $("#queryPage").classList.toggle("selecting", querySelectMode);
  $("#toggleQuerySelect").textContent = querySelectMode ? "取消" : "选择";
  $("#queryDeleteTop").textContent = querySelectMode ? "删除" : "删除";
  $("#queryList").innerHTML = records.length ? records.map((record) => `
    <article class="query-item${selectedQueryIds.has(record.id) ? " selected" : ""}${record.temporary ? " temporary" : ""}" data-id="${record.id}">
      <button class="query-check" type="button" aria-label="选择记录"></button>
      <div class="query-record-info">
        <div class="query-name-line">
          <strong>${record.name || "--"}</strong>
          <span class="query-sex ${record.sex === "女" ? "female" : "male"}">${record.sex || "--"}</span>
        </div>
        <div class="query-time">${record.date || "--"} ${record.time || ""}</div>
        <div class="query-place">${record.place || `${record.province || ""}${record.city || ""}` || "--"}</div>
      </div>
      <div class="query-pillars-card">
        <div class="query-pillars">
          ${record.pillars.slice(0, 4).map((pillar) => `
            <span>
              <b class="${stemClass(pillar[0])}">${pillar[0] || ""}</b>
              <b class="${branchClass(pillar[1])}">${pillar[1] || ""}</b>
            </span>
          `).join("") || `<span><b>出</b><b>生</b></span><span><b>时</b><b>辰</b></span>`}
        </div>
      </div>
      <span class="query-arrow">›</span>
    </article>
  `).join("") : `<p class="query-empty">暂无存档</p>`;
  bindQueryItemClicks();
}

async function openQueryPage() {
  querySelectMode = false;
  selectedQueryIds.clear();
  showPage("query");
  try {
    await loadBaziArchiveRecords((($("#querySearch")?.value) || "").trim());
  } catch (error) {
    $("#queryList").innerHTML = `<p class="query-empty">${error.message || "查询存档失败"}</p>`;
  }
}

function closeQueryPage() {
  showPage(chartState ? "chart" : "input");
}

function toggleQuerySelectMode() {
  querySelectMode = !querySelectMode;
  selectedQueryIds.clear();
  renderQueryList();
}

function bindQueryItemClicks() {
  document.querySelectorAll(".query-item").forEach((item) => {
    item.addEventListener("click", () => {
      const id = item.dataset.id;
      if (!querySelectMode) {
        openArchivedChart(id);
        return;
      }
      if (selectedQueryIds.has(id)) selectedQueryIds.delete(id);
      else selectedQueryIds.add(id);
      renderQueryList();
    });
  });
}

async function deleteSelectedQueryItems() {
  if (!querySelectMode) {
    querySelectMode = true;
    renderQueryList();
    return;
  }
  if (!selectedQueryIds.size) return;
  try {
    await baziArchiveApi("/recordsDel", "POST", {
      phone: archivePhone(),
      ids: [...selectedQueryIds].join(",")
    });
  } catch (error) {
    $("#queryList").insertAdjacentHTML("afterbegin", `<p class="query-empty">${error.message || "删除失败"}</p>`);
    return;
  }
  if (chartState?.archive?.canSave === false) {
    chartState.archive.canSave = true;
    refreshArchivePermission();
  }
  selectedQueryIds.clear();
  querySelectMode = false;
  await loadBaziArchiveRecords((($("#querySearch")?.value) || "").trim());
}

async function openArchivedChart(id) {
  const record = queryRecords().find(item => item.id === id);
  if (!record) return;
  try {
    const values = {
      name: record.name || "",
      sex: record.sex || "男",
      date: record.date,
      time: record.time || "00:00",
      province: record.province || "",
      city: record.city || "",
      calendar: "solar",
      useTrueSolar: Boolean(record.trueSolar)
    };
    const data = await requestBaziChart({
      phone: localStorage.getItem("qiyuan-login-phone") || "",
      profile: {name: values.name, gender: values.sex},
      birth: {
        calendar: "solar",
        date: values.date,
        time: values.time,
        province: values.province,
        city: values.city,
        longitude: values.province && values.city ? resolveLongitude(values.province, values.city).longitude : null
      },
      calculationOptions: {trueSolarTime: values.useTrueSolar}
    });
    values.clockSolarDate = data.time.solar.date;
    values.chartDate = data.time.chart.date;
    values.chartTime = data.time.chart.time;
    values.trueSolar = data.time.trueSolar.enabled ? {
      trueSolarText: `${data.time.chart.date} ${data.time.chart.time}`,
      beijingText: `${data.time.solar.date} ${data.time.solar.time}`,
      meanSolarText: `${data.time.chart.date} ${data.time.chart.time}`,
      longitudeOffset: data.time.trueSolar.longitudeOffset,
      equationOffset: data.time.trueSolar.equationOffset
    } : null;
    chartState = {
      chartId: data.chartId,
      viewer: data.viewer,
      professional: data.professional,
      archive: data.archive,
      baseChart: data.baseChart,
      view: data.view,
      values,
      pillars: data.baseChart.pillars,
      fortune: data.fortune,
      selections: data.view.selection
    };
    duiyuanCatalogState = null;
    refreshArchivePermission();
    closeQueryPage();
    renderProfile(data.calendarData, values);
    renderBazi(chartState.pillars, values.sex, []);
    document.querySelector("#patternText").textContent = data.baseChart.pattern.name;
    renderFortune();
    duiyuanApplyOpen = false;
    renderDuiyuanApply();
    showPage("chart");
  } catch (error) {
    document.querySelector("#errorText").textContent = error.message || "存档恢复失败。";
    showPage("input");
  }
}

function duiyuanCategory() {
  const catalog = duiyuanCatalogState || [];
  return catalog.find((item) => item.key === duiyuanState.category) || catalog[0];
}

function duiyuanComboForBranch(branch = duiyuanState.branch) {
  const category = duiyuanCategory();
  return category.combos.find((combo) => combo.branches.includes(branch)) || category.combos[0];
}

function renderDuiyuanTabs() {
  const catalog = duiyuanCatalogState || [];
  const labels = ["六合", "六害", "六破", "六冲", "三刑", "三合", "三会"];
  const keys = [...new Set([...labels, ...catalog.map(category => category.key)])];
  $("#duiyuanTabs").innerHTML = keys.map((key) => `
    <button class="${key === duiyuanState.category ? "active" : ""}${!catalog.some(category => category.key === key) ? " locked" : ""}" type="button" data-category="${key}" aria-disabled="${!catalog.some(category => category.key === key)}">
      ${key}
    </button>
  `).join("");
  document.querySelectorAll("#duiyuanTabs button").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.classList.contains("locked")) {
        openPaywallPage();
        return;
      }
      duiyuanState.category = button.dataset.category;
      const combo = duiyuanComboForBranch(duiyuanState.branch);
      duiyuanState.branch = combo.branches[0];
      renderDuiyuanPage();
    });
  });
}

function renderDuiyuanCircle() {
  const combo = duiyuanComboForBranch();
  const radius = 41;
  $("#duiyuanCircle").innerHTML = `
    <div class="duiyuan-ring-line"></div>
    <div class="duiyuan-center">
      <h3 id="duiyuanComboTitle">${combo.title}</h3>
      <p id="duiyuanComboText">${combo.text.replace(/\n/g, "<br>")}</p>
    </div>
    ${DUIYUAN_BRANCH_ORDER.map((branch, index) => {
    const angle = -90 + index * 30;
    const x = 50 + radius * Math.cos(angle * Math.PI / 180);
    const y = 50 + radius * Math.sin(angle * Math.PI / 180);
    const active = branch === duiyuanState.branch;
    const related = combo.branches.includes(branch);
    return `<button class="duiyuan-branch${active ? " active" : ""}${related && !active ? " related" : ""}" type="button" data-branch="${branch}" style="left:${x}%;top:${y}%;">${branch}</button>`;
  }).join("")}
  `;
  document.querySelectorAll(".duiyuan-branch").forEach((button) => {
    button.addEventListener("click", () => {
      duiyuanState.branch = button.dataset.branch;
      renderDuiyuanPage();
    });
  });
}

function renderDuiyuanPage() {
  const category = duiyuanCategory();
  if (!category) throw new Error("兑元口诀数据尚未加载。");
  renderDuiyuanCircle();
  renderDuiyuanTabs();
  $("#duiyuanSummary").innerHTML = category.summary.replace(/\n/g, "<br>");
}

async function openDuiyuanPage() {
  const button=$("#duiyuanButton");
  button.disabled = true;
  const string = '[{"key":"六合","summary":"六合阴阳气势行，财利逼迫非真合。\\n因时因地巧成合，同床异梦祸患窝。\\n财宝逢合财宝去，凶煞逢合凶煞躲。\\n身若逢合又一般，带财带鬼阴阳隔。\\n桃花逢合酒色败，妻走儿哭细分说。\\n胎若逢合把胎论，带胎娶妻绝不活。\\n死人逢合能还阳，坟墓逢合枉造作。\\n六合若也成化气，细分真假无差错。","combos":[{"branches":["子","丑"],"title":"子丑合","text":"子丑婚姻不自由，\\n祖辈凶死小辈浊。"},{"branches":["午","未"],"title":"午未合","text":"午未君子心宽阔，\\n奶奶成双儿发科。"},{"branches":["寅","亥"],"title":"寅亥合","text":"寅亥后代出文秀，\\n祖上非死即残跛。"},{"branches":["巳","申"],"title":"巳申合","text":"巳申夫妻骂不完，\\n兵刑子孙祖辈跎。"},{"branches":["卯","戌"],"title":"卯戌合","text":"卯戌干柴见火炉，\\n未婚偷情不寂寞。\\n长上定有二婚人，\\n后代官刑须忌火。"},{"branches":["辰","酉"],"title":"辰酉合","text":"辰酉明珠投暗路，\\n私定终身回秋波。\\n太爷兵囚不善终，\\n子女不孝家门锁。"}],"locked":false},{"key":"六害","summary":"六害本是扫把星，男女婚配最有验。\\n你打我骂拇止休，害死害病报前缘。\\n挣钱辛苦不聚财，朝来夕去诚可叹。\\n六害本是玄武神，小人陷害又捣乱。\\n冲起玄武最可怕，伤灾疾病车马翻。\\n年月日时大害小，时能害年又一般。\\n六害最忌日时犯，老年疾苦开口言，\\n六害再把阳刃犯，虎咬蛇伤刀剑砍。","combos":[{"branches":["丑","午"],"title":"丑午害","text":"自古白马怕青牛，\\n暗损阴德招祸患。"},{"branches":["子","未"],"title":"子未害","text":"鼠羊相逢一旦休，\\n骨肉情疏夫妻战。"},{"branches":["卯","辰"],"title":"卯辰害","text":"玉兔从龙皆有损，\\n刑伤牢狱怕见官。"},{"branches":["申","亥"],"title":"申亥害","text":"猪见猿猴似箭抽，\\n官讼舟车亲朋叛。"},{"branches":["寅","巳"],"title":"寅巳害","text":"蛇见猛虎如刀割，\\n道路白虎分贵贱。"},{"branches":["酉","戌"],"title":"酉戌害","text":"金鸡遇犬泪交流，\\n酒色桃花伤脸面。"}],"locked":false},{"key":"六破","summary":"六破本是铁钥匙，钥匙开锁有玄机。\\n财官贵锁印食寿，开了伤贵身早死。\\n生死之锁阎王账，破开生死灾祸欺。\\n禄旺胎养福禄锁，三星破开损福气。\\n最怕透地根遭破，阎王收魂不全尸。\\n财官入库不通天，破开宝库最可喜。\\n遇破开言损面皮，不是伤疤就是痣。\\n钥匙逢合是痞子，神仙开锁有凭依。","combos":[{"branches":["寅","亥"],"title":"寅亥破","text":"破开锁头成六合，\\n劳心费劲来求利。\\n小人是非说不完，\\n先败后成言好事。"},{"branches":["卯","午"],"title":"卯午破","text":"锁肚破开是真破，\\n门户有损人哭泣。\\n求名求利都不成，\\n破去凶神反称奇。"},{"branches":["丑","辰"],"title":"丑辰破","text":"锁底遭破无归处，\\n朋友六亲无情义。\\n劳碌一生墙垣破，\\n是非刑伤开箱急。"},{"branches":["巳","申"],"title":"巳申破","text":"破开锁头成六合，\\n劳心费劲来求利。\\n小人是非说不完，\\n先败后成言好事。"},{"branches":["子","酉"],"title":"子酉破","text":"锁肚破开是真破，\\n门户有损人哭泣。\\n求名求利都不成，\\n破去凶神反称奇。"},{"branches":["未","戌"],"title":"未戌破","text":"锁底遭破无归处，\\n朋友六亲无情义。\\n劳碌一生墙垣破，\\n是非刑伤开箱急。"}],"locked":false},{"key":"六冲","summary":"六冲本是急先锋，先锋先要明爱憎。\\n敌友分明吉凶定，冲去凶神吉事成。\\n年月离祖克六亲，年日六亲情义冷。\\n年时子女多病伤，月日父母似煎蒸。\\n月时居处多变动，克妻损子日时逢。\\n为人性刚命带冲，年重时轻性耿耿。\\n胎养逢冲妻子损，生旺逢冲不善终。\\n败地逢冲不知耻，死绝逢冲灾祸猛。\\n命逢六冲多改动，生旺墓库又不同。\\n狗拿老鼠缘四生，寅申巳亥各自冲。","combos":[{"branches":["寅","申"],"title":"寅申冲","text":"男忧道路女忧产，\\n虎猴相见少阳盛。"},{"branches":["巳","亥"],"title":"巳亥冲","text":"猪蛇相缠厥阴木，\\n外家寄养又伤刑。"},{"branches":["子","午"],"title":"子午冲","text":"鼠马少阴君火位，\\n君父克破改门庭。"},{"branches":["卯","酉"],"title":"卯酉冲","text":"鸡兔燥金人多情，\\n父母遭克自身病。"},{"branches":["丑","未"],"title":"丑未冲","text":"牛羊栏中太阴土，\\n孤独多病却有名。"},{"branches":["辰","戌"],"title":"辰戌冲","text":"犬龙太阳文曲水，\\n鬼神过房富贵通。"}],"locked":false},{"key":"三刑","summary":"三刑之害有前因，天地人生成三才。\\n三才逢冲又遇破，阳退阴进乱挨排。\\n天地未生幽冥气，无冲无破如大海。\\n冲破大海不是刑，罡魁相邀三界外。\\n三刑本是后羿神，张弓塔箭射过来。\\n刑伤囚牢不自由，毁折残疾都是债。\\n刑旺刑贵有功德，打落九阳锦箱开。\\n刑死刑绝入天牢，得用英雄莫问家。","combos":[{"branches":["子","午","卯"],"title":"子午卯","text":"天生于子卯开门，\\n面泛桃花不可耐。\\n一见邪火黑天少，\\n名声败坏吃喝玩。"},{"branches":["丑","未","戌"],"title":"丑未戌","text":"地生于丑戌山坟，\\n未上神鬼土神灾。\\n血光打斗受孤寡，\\n九流盗骗六亲汰。"},{"branches":["寅","巳","申"],"title":"寅巳申","text":"人生于寅蛇丧车，\\n传送刀兵道路塞。\\n筋骨脓疮偷盗来，\\n车马官司损钱财。"},{"branches":["辰","酉","亥"],"title":"辰酉亥","text":"阴私黑猪神庙鸡，\\n天罗死尸战龙台。\\n贪花恋酒徒自伤，\\n心神不守鬼入宅。"}],"locked":false},{"key":"三合","summary":"三合非假有来因，三生石上功德香。\\n积善人家得福报，藏风聚气龙虎强。\\n来有源头去有归，三合成局富贵长。\\n三焦和气平生顺，谋为多成得人帮。\\n三合土多空屠龙，坐向死绝祸患当。\\n太岁破土取黄金，不见劫杀名利忙。\\n三合透天是真龙，不透真神龙不旺。\\n伏藏杀神怕惊动，通天财神惧劫乡。\\n一脉相承天恩赐，也有顺逆似船航。\\n顺河行船意气高，逆风逆水徒悲伤。","combos":[{"branches":["亥","卯","未"],"title":"亥卯未","text":"黑猪玉兔与青羊，\\n仁义谦恭把名扬。"},{"branches":["巳","酉","丑"],"title":"巳酉丑","text":"白蛇金鸡见老牛，\\n讨逆伐乱身好躺。"},{"branches":["寅","午","戌"],"title":"寅午戌","text":"猛虎下山会马大，\\n诗书化愚走八方。"},{"branches":["申","子","辰"],"title":"申子辰","text":"金猴携鼠拜龙宫，\\n江河归海万里长。"}],"locked":false},{"key":"三会","summary":"桃园结义刘关张，交朋结友会四方。\\n肝胆相照斩白蛇，酒肉兄弟忧萧墙。\\n成方是福也是祸，平地一声霹雳响。\\n得用荣华富贵显，为害劳苦奔他乡。","combos":[{"branches":["寅","卯","辰"],"title":"寅卯辰","text":"木旺东方主仁慈，\\n布施怜悯人称良。\\n木火仁慈又有礼，\\n木水祖荫远流长。\\n木金剪裁怕冲刑，\\n木土相战有损伤。"},{"branches":["巳","午","未"],"title":"巳午未","text":"火旺南方心恭敬，\\n笔墨诗书妙文章。\\n火木相生文明相，\\n火土无礼也无信。\\n火金劳碌难聚财，\\n火水是非惹无常。"},{"branches":["申","酉","戌"],"title":"申酉戌","text":"金旺西方有义气，\\n仗剑行侠性子刚。\\n金水动静皆有谋，\\n金威土信两无妨。\\n金火无礼多是非，\\n金木妻妾忧产亡。"},{"branches":["亥","子","丑"],"title":"亥子丑","text":"水旺北方多计谋，\\n苏秦背剑入庙堂。\\n水木聪明更秀气，\\n水金破祖拜爹娘。\\n水土千倾万贯主，\\n水火是非惹灾殃。"}],"locked":false}]'
  try {
    if (!duiyuanCatalogState?.length) {
      const returnedCatalog = JSON.parse(string).map(t => {
        if (t.key !== '六合' && !["1", "2"].includes(localStorage.getItem(LOGIN_PRO_KEY))) {
          return {...t, locked: true}
        }
        return {...t, locked: false}
      });
      if (!Array.isArray(returnedCatalog) || !returnedCatalog.length) throw new Error("排盘接口未返回兑元口诀数据。");
      duiyuanCatalogState = returnedCatalog;
      if (!hasAdvancedRights()) duiyuanCatalogState = duiyuanCatalogState.filter(category => category.key === "六合");
    }
    if (!duiyuanCatalogState.some(category => category.key === duiyuanState.category)) duiyuanState.category = "六合";
    if (!duiyuanCatalogState.some(category => category.key === duiyuanState.category)) duiyuanState.category = duiyuanCatalogState[0]?.key || "六合";
    renderDuiyuanPage();
    showPage("duiyuan");
  } catch (error) {
    $("#errorText").textContent = error.message || "兑元口诀加载失败。";
  } finally {
    button.disabled = false;
  }
}

function closeDuiyuanPage() {
  showPage(previousPage === "query" ? "query" : (chartState ? "chart" : "input"), {keepPrevious: true});
}

function openPaywallPage() {
  $("#paywallNotice").textContent = "";
  showPage("paywall");
}

function closePaywallPage() {
  showPage(previousPage === "duiyuan" ? "duiyuan" : (chartState ? "chart" : "input"), {keepPrevious: true});
}

function formatDuiyuanText(text, options = {}) {
  const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
  if (!options.mergeIncompleteLines) {
    return lines.map((line) => `<p>${line}</p>`).join("");
  }
  const sentences = [];
  let current = "";
  lines.forEach((line) => {
    current += line;
    if (/[。！？；]$/.test(line)) {
      sentences.push(current);
      current = "";
    }
  });
  if (current) sentences.push(current);
  return sentences.map((line) => `<p>${line}</p>`).join("");
}

function renderDuiyuanApply() {
  if (!chartState) return;
  const allowedCategories = new Set((chartState.professional?.duiyuan?.value?.catalog || []).map(category => category.key));
  const matches = (chartState.professional?.duiyuan?.value?.matches || []).filter(({category}) => allowedCategories.has(category.key));
  const card = $("#duiyuanApplyCard");
  if (!matches.length) {
    card.classList.add("hidden");
    return;
  }
  card.classList.remove("hidden");
  $("#toggleDuiyuanApply b").textContent = duiyuanApplyOpen ? "收起" : "详情";
  $("#duiyuanApplyBody").classList.toggle("hidden", !duiyuanApplyOpen);
  $("#duiyuanApplyBody").innerHTML = matches.map(({category, combos}, index) => `
    <section class="duiyuan-apply-section${index > 0 ? " separated" : ""}">
      <div class="duiyuan-apply-row">
        <span class="duiyuan-apply-tag">${category.key}总论</span>
        <div class="duiyuan-apply-text">${formatDuiyuanText(category.summary)}</div>
      </div>
      ${combos.map((combo) => `
        <div class="duiyuan-apply-row combo">
          <span class="duiyuan-apply-tag">${combo.title}</span>
          <div class="duiyuan-apply-text">${formatDuiyuanText(combo.text, {mergeIncompleteLines: true})}</div>
        </div>
      `).join("")}
    </section>
  `).join("");
}

function toggleDuiyuanApply() {
  duiyuanApplyOpen = !duiyuanApplyOpen;
  renderDuiyuanApply();
}

function renderBazi(basePillars, sex, additions = []) {
  const scores = chartState?.baseChart?.elementScores || {};
  const pillars = [...basePillars, ...additions];
  const sideTitle = sex === "男" ? "乾造" : "坤造";
  const labels = ["年柱", "月柱", "日柱", "时柱", ...additions.map((pillar) => pillar.label)];
  const colCount = pillars.length;
  const hasAdditions = additions.length > 0;
  const fortuneSpacers = Array.from({length: Math.max(0, colCount - 4)}, () => "");
  const hiddenScoreItems = chartState?.professional?.hiddenStemScores?.value || [];
  const hiddenScoreMap = new Map(hiddenScoreItems.map((entry) => [entry.pillarKey, entry.items]));
  const showHiddenScores = hasAdvancedRights() && hasHiddenStemScores();
  const showFortuneScores = hasProfessionalRights() && hasFortuneScores() && chartState?.view?.fortuneScore;
  const hiddenStemHtml = (pillar) => {
    const baseItems = pillar.hiddenStems || [];
    const scoredItems = showHiddenScores ? hiddenScoreMap.get(pillar.key) || [] : [];
    const items = baseItems.length ? baseItems.map(item => scoredItems.find(scored => scored.stem === item.stem) || item) : scoredItems;
    return items.map(({
                        stem,
                        score
                      }) => `<span class="hidden-stem ${stemClass(stem)}"><span>${stem}</span>${showHiddenScores && score != null ? `<small>${score}</small>` : ""}</span>`).join("");
  };
  const rows = [
    [`<div class="side-block"><div class="side-title">${sideTitle}</div>${showHiddenScores ? `<div class="small-score">${ELEMENTS.map((item) => `${item}${String(scores[item] ?? 0).padStart(2, "0")}分`).join("<br>")}</div>` : ""}</div>`, ...labels],
    [...pillars.map((pillar) => `<span class="big-char ${stemClass(pillar.stem)}">${pillar.stem}</span>`)],
    [...pillars.map((pillar) => `<span class="big-char ${branchClass(pillar.branch)}">${pillar.branch}</span>`)],
    ["藏干", ...pillars.map(hiddenStemHtml)],
    ["运程", ELEMENTS.map((element) => `<span>${element}${showFortuneScores ? chartState.view.fortuneScore[element] ?? "—" : "—"}</span>`).join(""), ...fortuneSpacers],
    ["空亡", ...pillars.map((pillar) => pillar.empty || "--")],
    ["纳音", ...pillars.map((pillar) => pillar.nayin || "--")],
    ["花甲", ...pillars.map((pillar) => pillar.flower || "--")]
  ];

  const grid = $("#baziGrid");
  grid.style.setProperty("--pillar-count", colCount);
  grid.className = `chart-grid cols-${colCount}`;
  grid.innerHTML = rows.map((row, rowIndex) => row.map((cell, index) => {
    const isAdditionCell = (rowIndex === 0 && index > 4) || (rowIndex > 0 && index >= 4);
    const additionClass = isAdditionCell ? " add-column" : "";
    if (rowIndex === 0 && index === 0) return cell;
    if (rowIndex === 0) return `<div class="${additionClass.trim()}"><span class="pillar-label">${cell}</span></div>`;
    if (rowIndex === 1 || rowIndex === 2) return `<div class="cell${additionClass}">${cell}</div>`;
    if (index === 0) return `<div class="row-title">${cell}</div>`;
    if (rowIndex === 4 && index === 1) return `<div class="fortune-score-cell${showFortuneScores ? "" : " locked"}">${cell}</div>`;
    if (rowIndex === 4) return `<div class="fortune-score-spacer" aria-hidden="true"></div>`;
    return `<div class="cell${additionClass}${rowIndex === 3 && hasAdditions ? " hidden-vertical" : ""}${rowIndex === 6 && hasAdditions ? " nayin-vertical" : ""}">${cell}</div>`;
  }).join("")).join("") + renderAdditionControls(additions);
  bindRemovePillarControls();
}

function renderAdditionControls(additions) {
  if (!additions.length) return "";
  return additions.map((addition, index) => {
    const column = 6 + index;
    return `<button class="remove-pillar" type="button" data-level="${index + 1}" style="grid-column:${column};">×</button>`;
  }).join("");
}

function bindRemovePillarControls() {
  document.querySelectorAll(".remove-pillar").forEach((button) => {
    button.addEventListener("click", () => removePillarLevel(Number(button.dataset.level)));
  });
}

async function removePillarLevel(level) {
  if (!chartState) return;
  const selected = chartState.view?.selection || {};
  const keys = {
    luckKey: selected.luck?.key,
    yearKey: selected.year?.key,
    monthKey: selected.month?.key,
    dayKey: selected.day?.key
  };
  if (level <= 1) Object.assign(keys, {luckKey: null, yearKey: null, monthKey: null, dayKey: null});
  if (level === 2) Object.assign(keys, {yearKey: null, monthKey: null, dayKey: null});
  if (level === 3) Object.assign(keys, {monthKey: null, dayKey: null});
  if (level >= 4) keys.dayKey = null;
  chartState.view = await requestBaziView(keys);
  chartState.selections = chartState.view.selection;
  renderBazi(chartState.pillars, chartState.values.sex, chartState.view.additions);
  renderFortune();
}

function renderFortune() {
  const fortune = chartState.fortune || {};
  const start = fortune.start;
  $("#fortuneSummary").textContent = start
    ? `起运：${formatStartAge(start)}，逢${start.term || "节气"}后交大运；${fortune.direction === "forward" ? "顺排" : "逆排"}。虚岁 ${fortune.virtualAge ?? "—"}岁`
    : "起运信息暂无";

  $("#luckStrip").innerHTML = (chartState.view?.timelines?.lucks || fortune.lucks || []).map(renderTimelineItem).join("");
  $("#yearStrip").innerHTML = (chartState.view?.timelines?.years || []).map(renderTimelineItem).join("");
  $("#monthStrip").innerHTML = (chartState.view?.timelines?.months || []).map(renderTimelineItem).join("");
  $("#dayStrip").innerHTML = (chartState.view?.timelines?.days || []).map(renderTimelineItem).join("");
  bindTimelineClicks();
}

function timelineTop(item) {
  if (item.type === "luck") return `${item.startYear}<br>${item.startAge}岁`;
  if (item.type === "year") return `${item.year}<br>${item.age}岁`;
  if (item.type === "month") return `${String(item.date).slice(5).replace("-", "/")}<br>${item.term}`;
  if (item.type === "day") return `${String(item.date).slice(5).replace("-", "/")}<br>${item.lunarLabel || ""}`;
  return item.label;
}

function selectedKey(item) {
  if (item.key) return item.key;
  if (item.type === "luck") return String(item.startYear);
  if (item.type === "year") return String(item.year);
  if (item.type === "month" || item.type === "day") return solarDateValue(item.date);
  return item.pillar;
}

function isSelected(item) {
  const selections = chartState.view?.selection || chartState.selections;
  return [selections.luck, selections.year, selections.month, selections.day].some((selected) => (
    selected && selected.type === item.type && selectedKey(selected) === selectedKey(item)
  ));
}

function renderTimelineItem(item) {
  const active = isSelected(item);
  return `
    <button class="timeline-item${active ? " active" : ""}" type="button" data-type="${item.type}" data-key="${selectedKey(item)}">
      <div class="timeline-top">${timelineTop(item)}</div>
      <div class="timeline-ganzhi">
        <span class="${stemClass(item.pillar[0])}">${item.pillar[0]}</span>
        <span class="${branchClass(item.pillar[1])}">${item.pillar[1]}</span>
      </div>
    </button>
  `;
}

function bindTimelineClicks() {
  document.querySelectorAll(".timeline-item").forEach((button) => {
    button.addEventListener("click", () => selectTimelineItem(button.dataset.type, button.dataset.key));
  });
}

function findItem(type, key) {
  const plural = {luck: "lucks", year: "years", month: "months", day: "days"}[type];
  return (chartState.view?.timelines?.[plural] || []).find((item) => selectedKey(item) === key) || null;
}

async function selectTimelineItem(type, key) {
  const item = findItem(type, key);
  if (!item) return;
  const current = chartState.view?.selection || {};
  const keys = {
    luckKey: current.luck?.key,
    yearKey: current.year?.key,
    monthKey: current.month?.key,
    dayKey: current.day?.key
  };
  if (type === "luck") Object.assign(keys, {luckKey: item.key, yearKey: null, monthKey: null, dayKey: null});
  if (type === "year") Object.assign(keys, {yearKey: item.key, monthKey: null, dayKey: null});
  if (type === "month") Object.assign(keys, {monthKey: item.key, dayKey: null});
  if (type === "day") keys.dayKey = item.key;
  try {
    chartState.view = await requestBaziView(keys);
    chartState.selections = chartState.view.selection;
    renderBazi(chartState.pillars, chartState.values.sex, chartState.view.additions);
    renderFortune();
  } catch (error) {
    $("#errorText").textContent = error.message || "运程数据加载失败。";
  }
}

function selectedPillars() {
  return chartState?.view?.additions || [];
}

const BAZI_CHART_API_URL = window.BAZI_CHART_API_URL || "https://mopu.top/api/v1/bazi/charts";

function baziResponseData(payload, requiredKey, fallbackError) {
  const data = [payload?.data, payload?.msg, payload].find(value => value && typeof value === "object" && value[requiredKey]);
  if (!data) throw new Error(typeof payload?.message === "string" ? payload.message : typeof payload?.msg === "string" ? payload.msg : fallbackError);
  return data;
}

async function requestBaziChart(input) {
  const localTest = /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
  const response = await fetch(BAZI_CHART_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(localTest ? {Authorization: "Bearer local-professional-test"} : {})
    },
    body: JSON.stringify(input)
  }).catch(() => {
    throw new Error("排盘服务暂时无法连接，请确认 Node 服务已经启动。");
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || (payload.status !== undefined && (Number(payload.status) < 200 || Number(payload.status) >= 300)))
    throw new Error(typeof payload.msg === "string" ? payload.msg : payload.message || "排盘服务返回异常。");
  return baziResponseData(payload, "baseChart", "排盘接口未返回盘面数据。");
}

async function requestBaziView(keys) {
  const query = new URLSearchParams(Object.entries(keys).filter(([, value]) => value));
  const response = await fetch(`${BAZI_CHART_API_URL}/${chartState.chartId}/view?${query}`,
    {headers: /^(localhost|127\.0\.0\.1)$/.test(location.hostname) ? {Authorization: "Bearer local-professional-test"} : {}}
  ).catch(() => {
    throw new Error("排盘服务暂时无法连接。");
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || (payload.status !== undefined && (Number(payload.status) < 200 || Number(payload.status) >= 300)))
    throw new Error(typeof payload.msg === "string" ? payload.msg : payload.message || "运程接口返回异常。");
  const delta = baziResponseData(payload, "selection", "运程接口未返回选择数据。");
  const previous = chartState.view || {timelines: {}};
  const timelines = {...(previous.timelines || {}), ...(delta.timelines || {})};
  if (!keys.luckKey) Object.assign(timelines, {years: [], months: [], days: []});
  else if (!keys.yearKey) Object.assign(timelines, {months: [], days: []});
  else if (!keys.monthKey) Object.assign(timelines, {days: []});
  return {...previous, ...delta, timelines};
}

async function calculate(event) {
  event.preventDefault();
  $("#errorText").textContent = "";

  try {
    const values = {
      name: $("#personName").value.trim(),
      province: $("#birthProvince").value,
      city: $("#birthCity").value,
      sex: $("#gender").value,
      date: $("#birthDate").value,
      time: $("#birthTime").value,
      calendar: selectedCalendar,
      useTrueSolar: $("#useTrueSolar").checked
    };
    if (!values.date || !values.time) throw new Error("请选择出生时辰。");
    validateManualDate(values.date);
    const data = await requestBaziChart({
      phone: localStorage.getItem("qiyuan-login-phone") || "",
      profile: {name: values.name, gender: values.sex},
      birth: {
        calendar: values.calendar,
        date: values.date,
        time: values.time,
        province: values.province,
        city: values.city,
        longitude: values.province && values.city ? resolveLongitude(values.province, values.city).longitude : null
      },
      calculationOptions: {trueSolarTime: values.useTrueSolar}
    });
    const pillars = data.baseChart.pillars;
    const fortune = data.fortune;
    values.clockSolarDate = data.time.solar.date;
    values.chartDate = data.time.chart.date;
    values.chartTime = data.time.chart.time;
    values.trueSolar = data.time.trueSolar.enabled ? {
      date: data.time.chart.date,
      time: data.time.chart.time,
      trueSolarText: `${data.time.chart.date} ${data.time.chart.time}`,
      beijingText: `${data.time.solar.date} ${data.time.solar.time}`,
      meanSolarText: `${data.time.chart.date} ${data.time.chart.time}`,
      longitudeOffset: data.time.trueSolar.longitudeOffset,
      equationOffset: data.time.trueSolar.equationOffset
    } : null;
    chartState = {
      chartId: data.chartId,
      viewer: data.viewer,
      professional: data.professional,
      archive: data.archive,
      baseChart: data.baseChart,
      view: data.view,
      values,
      pillars,
      fortune,
      selections: {luck: null, year: null, month: null, day: null}
    };
    duiyuanCatalogState = null;
    refreshArchivePermission();
    hiddenQueryIds.clear();

    renderProfile(data.calendarData, values);
    renderBazi(pillars, values.sex, selectedPillars());
    $("#patternText").textContent = data.baseChart.pattern.name;
    renderFortune();
    duiyuanApplyOpen = false;
    renderDuiyuanApply();
    showPage("chart");
  } catch (error) {
    $("#errorText").textContent = error.message || "排盘失败，请检查输入。";
    showPage("input");
  }
}

$("#backToMainHome").addEventListener("click", () => {
  if (window.parent && window.parent !== window) {
    window.parent.postMessage({type: "bazi-back-home"}, "*");
    if (typeof window.parent.showView === "function") {
      window.parent.showView("home");
    }
    return;
  }
  window.location.href = "../index.html";
});
$("#backToInput").addEventListener("click", () => showPage("input"));
$("#toggleEdit").addEventListener("click", () => showPage("input"));
FORM.addEventListener("submit", calculate);

initRegionSelects();
initDateTimePicker();
initEntryInteractions();
showPage("input", {keepPrevious: true});


(function () {
  const API_BASE = 'https://mopu.top/api';

  const QR_OVERLAY = document.getElementById('qrOverlay');
  const QR_BOX = document.getElementById('qrBox');
  const QR_TITLE = document.getElementById('qrTitle');
  const QR_TIP = document.getElementById('qrTip');
  const QR_STATUS = document.getElementById('qrStatus');
  const QR_CLOSE = document.getElementById('qrClose');

  const PLAN_LABEL = {
    advanced: '高级版 ¥198 / 年',
    professional: '专业版 ¥298 / 年'
  };

  let pollTimer = null;
  let currentOutTradeNo = null;

  function getToken() {
    return localStorage.getItem('qiyuan-login-token');
  }

  function renderQR(container, text) {
    container.innerHTML = '';
    if (window.QRCode) {
      new QRCode(container, {text, width: 200, height: 200});
    } else if (window.qrcode) {
      const qr = qrcode(0, 'M');
      qr.addData(text);
      qr.make();
      container.innerHTML = qr.createImgTag(4);
    } else {
      container.textContent = text;
    }
  }

  function showOverlay(plan) {
    QR_TITLE.textContent = PLAN_LABEL[plan] || '扫码支付';
    QR_STATUS.textContent = '等待支付中…';
    QR_STATUS.className = 'qr-status';
    QR_OVERLAY.classList.remove('hidden');
  }

  function stopPolling() {
    if (pollTimer) {
      clearInterval(pollTimer);
      pollTimer = null;
    }
  }

  function closeOverlay() {
    stopPolling();
    currentOutTradeNo = null;
    QR_OVERLAY.classList.add('hidden');
    QR_BOX.innerHTML = '';
  }

  QR_CLOSE.addEventListener('click', closeOverlay);
  QR_OVERLAY.addEventListener('click', (e) => {
    if (e.target === QR_OVERLAY) closeOverlay();
  });

  // 生成支付订单
  async function createNativePayment(plan) {
    const token = getToken();
    if (!token) {
      alert('请先登录后再开通会员');
      return;
    }

    try {
      const resp = await fetch(`${API_BASE}/v1/payments/native`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({plan})
      });

      if (resp.status === 401) {
        alert('登录状态已失效，请重新登录');
        return;
      }
      if (!resp.ok) throw new Error(`请求失败：${resp.status}`);

      const data = await resp.json();
      const payload = data.data || data;
      const codeUrl = payload.codeUrl || payload.code_url;
      const outTradeNo = payload.outTradeNo || payload.out_trade_no;

      if (!codeUrl || !outTradeNo) {
        console.error('接口返回：', data);
        alert('未获取到支付信息，请稍后重试');
        return;
      }

      currentOutTradeNo = outTradeNo;
      showOverlay(plan);
      renderQR(QR_BOX, codeUrl);
      startPolling(outTradeNo);
    } catch (err) {
      console.error(err);
      alert('发起支付失败，请稍后重试');
    }
  }

  // 轮询支付状态
  function startPolling(outTradeNo) {
    stopPolling();
    // 立即查一次，然后每 3 秒轮询
    checkStatus(outTradeNo);
    pollTimer = setInterval(() => checkStatus(outTradeNo), 3000);
  }

  async function checkStatus(outTradeNo) {
    // 如果订单已切换或弹层已关，停止
    if (currentOutTradeNo !== outTradeNo) {
      stopPolling();
      return;
    }

    const token = getToken();
    if (!token) {
      stopPolling();
      return;
    }

    try {
      const resp = await fetch(
        `${API_BASE}/v1/payments/${encodeURIComponent(outTradeNo)}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (resp.status === 401) {
        stopPolling();
        QR_STATUS.textContent = '登录已失效，请重新登录';
        QR_STATUS.className = 'qr-status error';
        return;
      }
      if (!resp.ok) return; // 单次失败不终止轮询

      const data = await resp.json();
      const payload = data.data || data;
      // 兼容常见字段：status / tradeState / state
      const status = (payload.status || payload.tradeState || payload.state || '').toUpperCase();

      if (isPaid(status)) {
        stopPolling();
        QR_STATUS.textContent = '支付成功，权益已开通';
        QR_STATUS.className = 'qr-status success';
        const ship = {
          advanced: {level: 1, amount: 19800, description: '高级版会员一年'},
          professional: {level: 2, amount: 29800, description: '专业版会员一年'},
        }
        localStorage.setItem(LOGIN_PRO_KEY, String(ship[payload.plan].level) || '0');

        // 可选：刷新页面或更新会员状态
        setTimeout(() => {
          closeOverlay();
          location.reload();
        }, 1500);
      } else if (isClosed(status)) {
        stopPolling();
        QR_STATUS.textContent = '订单已关闭，请重新发起';
        QR_STATUS.className = 'qr-status error';
      } else {
        QR_STATUS.textContent = '等待支付中…';
        QR_STATUS.className = 'qr-status';
      }
    } catch (err) {
      // 网络抖动，忽略本次，继续轮询
      console.warn('查询支付状态失败：', err);
    }
  }

  function isPaid(status) {
    return ['PAID', 'SUCCESS', 'SUCCEEDED', 'TRADE_SUCCESS', 'PAY_SUCCESS'].includes(status);
  }

  function isClosed(status) {
    return ['CLOSED', 'CANCELED', 'CANCELLED', 'FAILED', 'EXPIRED'].includes(status);
  }

  // 绑定按钮
  document.querySelectorAll('[data-paywall-action]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const plan = btn.dataset.paywallAction;
      if (plan === 'advanced' || plan === 'professional') {
        createNativePayment(plan);
      } else if (plan === 'free') {
        // 免费使用逻辑
      }
    });
  });

  // 页面隐藏时停止轮询，避免后台空转
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopPolling();
    } else if (currentOutTradeNo && !QR_OVERLAY.classList.contains('hidden')) {
      startPolling(currentOutTradeNo);
    }
  });
})();
