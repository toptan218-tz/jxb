const qimenJuTable = {
    冬至: { dun: "阳遁", ju: [1, 7, 4] },
    小寒: { dun: "阳遁", ju: [2, 8, 5] },
    大寒: { dun: "阳遁", ju: [3, 9, 6] },
    立春: { dun: "阳遁", ju: [8, 5, 2] },
    雨水: { dun: "阳遁", ju: [9, 6, 3] },
    惊蛰: { dun: "阳遁", ju: [1, 7, 4] },
    春分: { dun: "阳遁", ju: [3, 9, 6] },
    清明: { dun: "阳遁", ju: [4, 1, 7] },
    谷雨: { dun: "阳遁", ju: [5, 2, 8] },
    立夏: { dun: "阳遁", ju: [4, 1, 7] },
    小满: { dun: "阳遁", ju: [5, 2, 8] },
    芒种: { dun: "阳遁", ju: [6, 3, 9] },
    夏至: { dun: "阴遁", ju: [9, 3, 6] },
    小暑: { dun: "阴遁", ju: [8, 2, 5] },
    大暑: { dun: "阴遁", ju: [7, 1, 4] },
    立秋: { dun: "阴遁", ju: [2, 5, 8] },
    处暑: { dun: "阴遁", ju: [1, 4, 7] },
    白露: { dun: "阴遁", ju: [9, 3, 6] },
    秋分: { dun: "阴遁", ju: [7, 1, 4] },
    寒露: { dun: "阴遁", ju: [6, 9, 3] },
    霜降: { dun: "阴遁", ju: [5, 8, 2] },
    立冬: { dun: "阴遁", ju: [6, 9, 3] },
    小雪: { dun: "阴遁", ju: [5, 8, 2] },
    大雪: { dun: "阴遁", ju: [4, 7, 1] },
};

const yuanNames = ["上元", "中元", "下元"];
const luoShuOrder = ["1", "8", "3", "4", "9", "2", "7", "6"];
const boardOrder = ["4", "9", "2", "3", "5", "7", "8", "1", "6"];
const sanQiLiuYi = ["戊", "己", "庚", "辛", "壬", "癸", "丁", "丙", "乙"];
const basicStars = {
    1: "天蓬",
    8: "天任",
    3: "天冲",
    4: "天辅",
    9: "天英",
    2: "天芮",
    7: "天柱",
    6: "天心",
    5: "天禽",
};
const basicDoors = {
    1: "休门",
    8: "生门",
    3: "伤门",
    4: "杜门",
    9: "景门",
    2: "死门",
    7: "惊门",
    6: "开门",
    5: "",
};
const palaceNames = {
    1: "坎一宫",
    2: "坤二宫",
    3: "震三宫",
    4: "巽四宫",
    5: "中五宫",
    6: "乾六宫",
    7: "兑七宫",
    8: "艮八宫",
    9: "离九宫",
};
const congenitalBaguaByGong = {
    9: "☰",
    4: "☱",
    3: "☲",
    8: "☳",
    2: "☴",
    7: "☵",
    6: "☶",
    1: "☷",
};
const palaceKeyingNumbers = {
    1: "1，6，6，1",
    2: "5，10，8，2",
    3: "3，8，4，3",
    4: "3，8，5，4",
    6: "4，9，1，6",
    7: "4，9，2，7",
    8: "5，10，7，8",
    9: "2，7，3，9",
};
const branches = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
const palaceMainBranch = {
    1: "子",
    2: "申",
    3: "卯",
    4: "巳",
    6: "亥",
    7: "酉",
    8: "寅",
    9: "午",
};
const palaceYinYangBranch = {
    2: { yang: "申", yin: "未" },
    4: { yang: "辰", yin: "巳" },
    6: { yang: "戌", yin: "亥" },
    8: { yang: "寅", yin: "丑" },
};
const branchElement = {
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
    亥: "水",
};
const palaceElement = {
    1: "水",
    2: "土",
    3: "木",
    4: "木",
    6: "金",
    7: "金",
    8: "土",
    9: "火",
};
const elementGenerates = { 木: "火", 火: "土", 土: "金", 金: "水", 水: "木" };
const elementControls = { 木: "土", 土: "水", 水: "火", 火: "金", 金: "木" };
const stemElement = {
    甲: "木",
    乙: "木",
    丙: "火",
    丁: "火",
    戊: "土",
    己: "土",
    庚: "金",
    辛: "金",
    壬: "水",
    癸: "水",
};
const stemChangShengStart = {
    甲: "亥",
    乙: "午",
    丙: "寅",
    丁: "酉",
    戊: "寅",
    己: "酉",
    庚: "巳",
    辛: "子",
    壬: "申",
    癸: "卯",
};
const yangStems = new Set(["甲", "丙", "戊", "庚", "壬"]);
const changShengNames = ["长", "沐", "冠", "临", "旺", "衰", "病", "死", "墓", "绝", "胎", "养"];
const oppositePalace = {
    1: "9",
    9: "1",
    2: "8",
    8: "2",
    3: "7",
    7: "3",
    4: "6",
    6: "4",
};
const doorElements = {
    开门: "金",
    休门: "水",
    生门: "土",
    伤门: "木",
    杜门: "木",
    景门: "火",
    死门: "土",
    惊门: "金",
};
const starElements = {
    天蓬: "水",
    天任: "土",
    天冲: "木",
    天辅: "木",
    天英: "火",
    天芮: "土",
    天柱: "金",
    天心: "金",
};
const branchToGong = {
    子: "1",
    丑: "8",
    寅: "8",
    卯: "3",
    辰: "4",
    巳: "4",
    午: "9",
    未: "2",
    申: "2",
    酉: "7",
    戌: "6",
    亥: "6",
};
const outerBranchPositions = {
    子: { left: "50%", top: "100%" },
    丑: { left: "16.666%", top: "100%" },
    寅: { left: "0", top: "83.333%" },
    卯: { left: "0", top: "50%" },
    辰: { left: "16.666%", top: "0" },
    巳: { left: "0", top: "16.666%" },
    午: { left: "50%", top: "0" },
    未: { left: "83.333%", top: "0" },
    申: { left: "100%", top: "16.666%" },
    酉: { left: "100%", top: "50%" },
    戌: { left: "100%", top: "83.333%" },
    亥: { left: "83.333%", top: "100%" },
};
const horseBranchPositions = {
    寅: { left: "-0.75rem", top: "calc(100% + 0.75rem)" },
    巳: { left: "-0.75rem", top: "-0.75rem" },
    申: { left: "calc(100% + 0.75rem)", top: "-0.75rem" },
    亥: { left: "calc(100% + 0.75rem)", top: "calc(100% + 0.75rem)" },
};
const stems = ["乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const stemTitles = {
    乙: "天德", 丙: "天威", 丁: "玉女", 戊: "天武", 己: "明堂",
    庚: "天刑", 辛: "天狱", 壬: "天牢", 癸: "天网",
};
const stemElementColors = {
    甲: "#24934f", 乙: "#24934f",
    丙: "#ed3217", 丁: "#ed3217",
    戊: "#d89a00", 己: "#d89a00",
    庚: "#3f7fe8", 辛: "#3f7fe8",
    壬: "#155487", 癸: "#155487",
};

const calendarDate = document.querySelector("#calendarDate");
const calendarResult = document.querySelector("#calendarResult");
const qimenDateTime = document.querySelector("#qimenDateTime");
const qimenCustomTime = document.querySelector("#qimenCustomTime");
const qimenResult = document.querySelector("#qimenResult");
const patterns81Selector = document.querySelector("#patterns81Selector");
const patterns81Result = document.querySelector("#patterns81Result");
const archiveForm = document.querySelector("#archiveForm");
const archivePerson = document.querySelector("#archivePerson");
const archiveMessage = document.querySelector("#archiveMessage");
const archiveSearch = document.querySelector("#archiveSearch");
const archiveList = document.querySelector("#archiveList");
const selectArchiveMode = document.querySelector("#selectArchiveMode");
const deleteArchive = document.querySelector("#deleteArchive");
const bottomMenu = document.querySelector(".bottom-menu");
const openArchiveButton = document.querySelector("#openArchive");
const openQueryButton = document.querySelector("#openQuery");
const authorModal = document.querySelector("#authorModal");
const openAuthorModal = document.querySelector("#openAuthorModal");
const closeAuthorModal = document.querySelector("#closeAuthorModal");
const archiveStoreKey = "qimen-tool-archives";
const archiveApiBaseUrl = window.API_BASE_URL || window.SIGN_API_BASE_URL || (window.SIGN_API_URL ? window.SIGN_API_URL.replace(/\/sign\/?$/, "") : "https://mopu.top/api");
const loginPhoneKey = "qiyuan-login-phone";
let currentViewName = "home";
let sourceReturnView = "home";
let qimenReturnView = "home";
let lastChartType = "qimen";
let qimenManualTime = false;
let currentQimenChartTime = "";
let qimenMethod = "chaibu";
let currentArchiveRecord = null;
let selectedUpperStem = "乙";
let selectedLowerStem = "乙";
let isArchiveSelectMode = false;
let selectedArchiveIds = new Set();
const views = {
    home: document.querySelector("#homeView"),
    bazi: document.querySelector("#baziView"),
    qimen: document.querySelector("#qimenView"),
    patterns81: document.querySelector("#patterns81View"),
    archive: document.querySelector("#archiveView"),
    query: document.querySelector("#queryView"),
};

function updateBottomMenuState(name = currentViewName) {
    const isQimenInput = name === "qimen" && !qimenResult.innerHTML.trim();
    bottomMenu.classList.toggle("hidden", name === "home" || name === "bazi" || name === "archive" || name === "patterns81" || isQimenInput);
}

function showView(name) {
    const previousViewName = currentViewName;
    if ((name === "archive" || name === "query") && ["home", "bazi", "qimen"].includes(previousViewName)) {
        sourceReturnView = previousViewName || "home";
    }
    if (name === "qimen" && previousViewName && previousViewName !== "qimen" && previousViewName !== "patterns81") {
        qimenReturnView = previousViewName;
    }
    for (const [viewName, view] of Object.entries(views)) {
        view.classList.toggle("active", viewName === name);
    }
    currentViewName = name;
    document.body.classList.toggle("qimen-view-active", name === "qimen" || name === "patterns81");
    if (name === "bazi" || name === "qimen") lastChartType = name;
    if (name === "qimen" && !qimenManualTime && !currentQimenChartTime) updateQimenCurrentTime();
    updateBottomMenuState(name);
    openArchiveButton.classList.toggle("active", name === "archive");
    openQueryButton.classList.toggle("active", name === "query");
    if (name === "query") {
        renderArchiveList();
    } else {
        isArchiveSelectMode = false;
        selectedArchiveIds = new Set();
    }
    window.scrollTo({ top: 0, behavior: "auto" });
}
window.showView = showView;

function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
}

function renderPatternStemButton(stem, layer, selectedStem) {
    return `
          <button
            class="patterns81-stem ${stem === selectedStem ? "active" : ""}"
            type="button"
            data-pattern-layer="${layer}"
            data-pattern-stem="${stem}"
            aria-pressed="${stem === selectedStem}"
            aria-label="${layer === "upper" ? "天盘干" : "地盘干"}${stem}"
            style="--stem-color:${stemElementColors[stem] || "#111"}"
          >${stem}</button>
        `;
}
function renderPatterns81() {
    patterns81Selector.innerHTML = `
    <span aria-hidden="true"></span>
    ${stems.map((stem) => `<span class="patterns81-alias">${stemTitles[stem]}</span>`).join("")}
    <span class="patterns81-axis-label">天盘干</span>
    ${stems.map((stem) => renderPatternStemButton(stem, "upper", selectedUpperStem)).join("")}
    <span class="patterns81-axis-label">地盘干</span>
    ${stems.map((stem) => renderPatternStemButton(stem, "lower", selectedLowerStem)).join("")}
  `;

    const currentKey = selectedUpperStem + selectedLowerStem;
    const item = (window.QIMEN_KE_YING?.gan || {})[currentKey];
    const patternName = item?.name || "格局内容待完善";
    const bodyLines = String(item?.text || "该格局内容待完善。")
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean);

    const [summary = "该格局内容待完善。", ...detailLines] = bodyLines;

    patterns81Result.innerHTML = `
    <div class="patterns81-pair">
      <span class="patterns81-pair-stem" style="--stem-color:${stemElementColors[selectedUpperStem] || "#111"}">${selectedUpperStem}</span>
      <span class="patterns81-pair-line" aria-hidden="true"></span>
      <span class="patterns81-pair-stem" style="--stem-color:${stemElementColors[selectedLowerStem] || "#111"}">${selectedLowerStem}</span>
    </div>
    <h3 class="patterns81-pattern-name">${escapeHtml(patternName)}</h3>
    <p class="patterns81-summary">${escapeHtml(summary)}</p>
    ${detailLines.length ? `<p class="patterns81-detail">${detailLines.map(escapeHtml).join("<br>")}</p>` : ""}
  `;
}

function setAuthorModal(open) {
    authorModal.classList.toggle("open", open);
    authorModal.setAttribute("aria-hidden", String(!open));
}

function handleQimenBack() {
    if (qimenResult.innerHTML.trim()) {
        qimenResult.innerHTML = "";
        currentQimenChartTime = "";
        currentArchiveRecord = null;
        updateBottomMenuState("qimen");
        window.scrollTo({ top: 0, behavior: "auto" });
        return;
    }
    showView("home");
}

function readArchives() {
    try {
        const data = JSON.parse(localStorage.getItem(archiveStoreKey) || "[]");
        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
}

function writeArchives(records) {
    localStorage.setItem(archiveStoreKey, JSON.stringify(records));
}

function archiveServerType(chartType) {
    return chartType === "qimen" ? "bazi" : "qimen";
}

function archivePhone() {
    return localStorage.getItem(loginPhoneKey) || "";
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

async function archiveApi(path, method, params = {}) {
    const query = method === "GET" ? `?${new URLSearchParams(params).toString()}` : "";
    const endpoint = `${archiveApiBaseUrl}${path}${query}`;
    const response = await fetch(endpoint, {
        method,
        headers: method === "GET" ? undefined : { "Content-Type": "application/json" },
        body: method === "GET" ? undefined : JSON.stringify(params),
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || (payload.status !== undefined && (Number(payload.status) < 200 || Number(payload.status) >= 300))) {
        const errorText = typeof payload.message === "string" ? payload.message : typeof payload.msg === "string" ? payload.msg : "存档服务返回异常。";
        throw new Error(errorText);
    }
    return payload.data ?? (typeof payload.msg === "object" ? payload.msg : null) ?? (typeof payload.message === "object" ? payload.message : null) ?? payload;
}

function unpackArchiveRows(result, chartType) {
    const rows = Array.isArray(result) ? result : result?.records || result?.list || result?.rows || result?.data || [];
    return rows.map((item) => {
        let record = item?.record || {};
        if (typeof record === "string") {
            try { record = JSON.parse(record); } catch { record = {}; }
        }
        return {
            ...record,
            id: String(item?.id ?? record.id),
            type: chartType,
            person: item?.name ?? record.person ?? record.name ?? "",
        };
    }).filter((record) => record.id && record.id !== "undefined" && record.id !== "null");
}

async function syncArchivesFromApi(name = "") {
    const chartType = "qimen";
    const result = await archiveApi("/record", "GET", {
        phone: archivePhone(),
        type: archiveServerType(chartType),
        name,
        pageIndex: 1,
        pageSize: 5,
    });
    const remote = unpackArchiveRows(result, chartType);
    writeArchives(remote);
    renderArchiveList();
}

function activeChartType() {
    return lastChartType;
}

function activeChartTime(type = activeChartType()) {
    return type === "bazi" ? calendarDate.value : currentQimenChartTime || qimenDateTime.value;
}

function archiveDateText(value) {
    return value ? value.slice(0, 10) : "";
}

async function saveCurrentArchive() {
    const person = archivePerson.value.trim();
    const type = activeChartType();
    const chartTime = activeChartTime(type);

    if (!person) {
        archiveMessage.textContent = "请填写姓名。";
        return;
    }

    const record = {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        type,
        person,
        chartTime,
        createdAt: dateTimeText(),
    };
    try {
        await archiveApi("/addRecord", "POST", {
            phone: archivePhone(),
            name: person,
            type: archiveServerType(type),
            record,
        });
        archiveSearch.value = "";
        await syncArchivesFromApi("");
    } catch (error) {
        archiveMessage.textContent = error.message || "存档失败，请检查服务。";
        showArchiveCallFeedback(archiveMessage.textContent, true);
        return;
    }
    archiveMessage.textContent = "已存档。";
    showArchiveCallFeedback("存档成功");
    archiveForm.reset();
    sourceReturnView = type === "qimen" ? "qimen" : "home";
    showView("query");
}

function renderArchiveList() {
    const keyword = archiveSearch.value.trim().toLowerCase();
    const records = readArchives().filter((record) => {
        const text = String(record.person || "").toLowerCase();
        return !keyword || text.includes(keyword);
    });
    const visibleIds = new Set(records.map((record) => record.id));
    selectedArchiveIds = new Set([...selectedArchiveIds].filter((id) => visibleIds.has(id)));
    selectArchiveMode.classList.toggle("active", isArchiveSelectMode);
    selectArchiveMode.setAttribute("aria-pressed", String(isArchiveSelectMode));
    selectArchiveMode.textContent = isArchiveSelectMode ? "取消" : "选择";

    if (!records.length) {
        archiveList.innerHTML = `<div class="empty-row">暂无存档。</div>`;
        return;
    }

    archiveList.innerHTML = `
          <table class="archive-table ${isArchiveSelectMode ? "select-mode" : ""}">
            <colgroup>
              ${isArchiveSelectMode ? `<col class="archive-select-col" />` : ""}
              <col class="archive-name-col" />
              <col class="archive-time-col" />
            </colgroup>
            <thead>
              <tr>${isArchiveSelectMode ? "<th></th>" : ""}<th>姓名</th><th>起局时间</th></tr>
            </thead>
            <tbody>
              ${records
        .map(
            (record) => `
                    <tr data-archive-id="${escapeHtml(record.id)}" class="${selectedArchiveIds.has(record.id) ? "selected" : ""}">
                      ${isArchiveSelectMode ? `<td class="archive-check-cell"><span class="archive-check">✓</span></td>` : ""}
                      <td>${escapeHtml(record.person || "--")}</td>
                      <td>${escapeHtml(archiveDateText(record.chartTime))}</td>
                    </tr>
                  `,
        )
        .join("")}
            </tbody>
          </table>
        `;

    archiveList.querySelectorAll("[data-archive-id]").forEach((row) => {
        row.addEventListener("click", () => handleArchiveRecordClick(row.dataset.archiveId));
    });
}

function handleArchiveRecordClick(id) {
    if (!isArchiveSelectMode) {
        openArchiveRecord(id);
        return;
    }

    if (selectedArchiveIds.has(id)) {
        selectedArchiveIds.delete(id);
    } else {
        selectedArchiveIds.add(id);
    }
    renderArchiveList();
}

function toggleArchiveSelectMode() {
    isArchiveSelectMode = !isArchiveSelectMode;
    selectedArchiveIds = new Set();
    renderArchiveList();
}

async function deleteSelectedArchives() {
    if (!selectedArchiveIds.size) return;
    const records = readArchives();
    try {
        await archiveApi("/recordsDel", "POST", {
            phone: archivePhone(),
            ids: [...selectedArchiveIds].join(","),
        });
    } catch (error) {
        archiveMessage.textContent = error.message || "删除失败，请检查服务。";
        return;
    }
    writeArchives(records.filter((item) => !selectedArchiveIds.has(item.id)));
    selectedArchiveIds = new Set();
    isArchiveSelectMode = false;
    renderArchiveList();
}

function openArchiveRecord(id) {
    const record = readArchives().find((item) => item.id === id);
    if (!record) return;

    if (record.type === "bazi") {
        calendarDate.value = record.chartTime;
        renderCalendar();
        showView("bazi");
        return;
    }

    qimenDateTime.value = record.chartTime;
    currentQimenChartTime = record.chartTime;
    qimenManualTime = true;
    currentArchiveRecord = record;
    renderQimen();
    showView("qimen");
}

function dateTimeText(date = new Date()) {
    const offset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

function updateQimenCurrentTime() {
    if (qimenManualTime) return;
    qimenDateTime.value = dateTimeText();
}

function enableQimenManualTime() {
    qimenManualTime = true;
    if (typeof qimenDateTime.showPicker === "function") {
        qimenDateTime.showPicker();
    } else {
        qimenDateTime.focus();
    }
}

function parseDateTime(value) {
    const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(value);
    if (!match) throw new Error("请选择一个完整时间。");
    const [year, month, day, hour, minute] = match.slice(1).map(Number);
    if (year < 1000 || year > 9999) throw new Error("手动输入年份范围为 1000-9999 年。");
    if (month < 1 || month > 12) throw new Error("请输入正确的月份。");
    if (day < 1 || day > new Date(year, month, 0).getDate()) throw new Error("请输入正确的日期。");
    if (hour < 0 || hour > 23 || minute < 0 || minute > 59) throw new Error("请输入正确的时间。");
    return { year, month, day, hour, minute };
}

function solarToDate(solar) {
    return new Date(
        solar.getYear(),
        solar.getMonth() - 1,
        solar.getDay(),
        solar.getHour(),
        solar.getMinute(),
        solar.getSecond(),
    );
}

function localDateOnly(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function getYuanInfoByFuTou(year, month, day) {
    const yuanByBranch = {
        子: 0,
        午: 0,
        卯: 0,
        酉: 0,
        寅: 1,
        申: 1,
        巳: 1,
        亥: 1,
        辰: 2,
        戌: 2,
        丑: 2,
        未: 2,
    };

    for (let i = 0; i < 5; i += 1) {
        const date = new Date(year, month - 1, day - i, 12, 0, 0);
        const solar = window.Solar.fromYmdHms(date.getFullYear(), date.getMonth() + 1, date.getDate(), 12, 0, 0);
        const lunar = solar.getLunar();
        const gan = lunar.getDayGan();
        if (gan === "甲" || gan === "己") {
            const zhi = lunar.getDayZhi();
            return {
                yuanIndex: yuanByBranch[zhi],
                fuTou: lunar.getDayInGanZhi(),
            };
        }
    }

    throw new Error("没有找到当前日期对应的甲/己符头。");
}

const zhirunYangTerms = ["冬至", "小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种"];
const zhirunYinTerms = ["夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪"];
const zhirunTermMonth = {
    冬至: 12,
    小寒: 1,
    大寒: 1,
    立春: 2,
    雨水: 2,
    惊蛰: 3,
    春分: 3,
    清明: 4,
    谷雨: 4,
    立夏: 5,
    小满: 5,
    芒种: 6,
    夏至: 6,
    小暑: 7,
    大暑: 7,
    立秋: 8,
    处暑: 8,
    白露: 9,
    秋分: 9,
    寒露: 10,
    霜降: 10,
    立冬: 11,
    小雪: 11,
    大雪: 12,
};
const ganZhiStems = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const ganZhiCycle = Array.from({ length: 60 }, (_, index) => `${ganZhiStems[index % 10]}${branches[index % 12]}`);
const monthJieTerms = ["立春", "惊蛰", "清明", "立夏", "芒种", "小暑", "立秋", "白露", "寒露", "立冬", "大雪", "小寒"];
const monthBranchByJieTerm = {
    立春: "寅",
    惊蛰: "卯",
    清明: "辰",
    立夏: "巳",
    芒种: "午",
    小暑: "未",
    立秋: "申",
    白露: "酉",
    寒露: "戌",
    立冬: "亥",
    大雪: "子",
    小寒: "丑",
};
const monthBranchOrder = ["寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥", "子", "丑"];
const monthStemStartByYearStem = {
    甲: "丙",
    己: "丙",
    乙: "戊",
    庚: "戊",
    丙: "庚",
    辛: "庚",
    丁: "壬",
    壬: "壬",
    戊: "甲",
    癸: "甲",
};
const solarTermMomentCache = new Map();

function daysBetween(start, end) {
    return Math.floor((localDateOnly(end) - localDateOnly(start)) / 86400000);
}

function solarTermMoment(year, term) {
    const cacheKey = `${year}-${term}`;
    if (solarTermMomentCache.has(cacheKey)) return new Date(solarTermMomentCache.get(cacheKey));
    const month = zhirunTermMonth[term];
    let cursor = new Date(year, month - 1, 1, 0, 0, 0);
    for (let i = 0; i < 60; i += 1) {
        const solar = window.Solar.fromYmdHms(
            cursor.getFullYear(),
            cursor.getMonth() + 1,
            cursor.getDate(),
            cursor.getHours(),
            cursor.getMinutes(),
            0,
        );
        const jieQi = solar.getLunar().getNextJieQi(false);
        if (!jieQi) break;
        const date = solarToDate(jieQi.getSolar());
        if (jieQi.getName() === term && date.getFullYear() === year) {
            const minuteDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), 0);
            solarTermMomentCache.set(cacheKey, minuteDate.getTime());
            return minuteDate;
        }
        cursor = new Date(date.getTime() + 60000);
    }
    throw new Error(`没有找到 ${year} 年 ${term} 的节气时间。`);
}

function solarTermDate(year, term) {
    return localDateOnly(solarTermMoment(year, term));
}

function preciseYearGanZhi(date) {
    const liChun = solarTermMoment(date.getFullYear(), "立春");
    const pillarYear = date.getTime() >= liChun.getTime() ? date.getFullYear() : date.getFullYear() - 1;
    return ganZhiCycle[((pillarYear - 1984) % 60 + 60) % 60];
}

function preciseMonthJieTerm(date) {
    const candidates = [];
    [date.getFullYear() - 1, date.getFullYear(), date.getFullYear() + 1].forEach((year) => {
        monthJieTerms.forEach((term) => {
            const termDate = solarTermMoment(year, term);
            if (termDate.getTime() <= date.getTime()) {
                candidates.push({ term, date: termDate });
            }
        });
    });
    candidates.sort((left, right) => right.date.getTime() - left.date.getTime());
    return candidates[0] || null;
}

function preciseMonthGanZhi(date, yearGanZhi) {
    const termInfo = preciseMonthJieTerm(date);
    if (!termInfo) throw new Error("没有找到当前时间对应的月令节气。");
    const branch = monthBranchByJieTerm[termInfo.term];
    const startStem = monthStemStartByYearStem[[...(yearGanZhi || "")][0]];
    const branchIndex = monthBranchOrder.indexOf(branch);
    const startStemIndex = ganZhiStems.indexOf(startStem);
    if (branchIndex < 0 || startStemIndex < 0) throw new Error("月柱换算失败。");
    return `${ganZhiStems[(startStemIndex + branchIndex) % ganZhiStems.length]}${branch}`;
}

function preciseSiZhu(date, lunar) {
    const yearGanZhi = preciseYearGanZhi(date);
    return {
        year: yearGanZhi,
        month: preciseMonthGanZhi(date, yearGanZhi),
        day: lunar.getDayInGanZhi(),
        time: lunar.getTimeInGanZhi(),
    };
}

function dayGanZhiIndex(date) {
    const solar = window.Solar.fromYmdHms(date.getFullYear(), date.getMonth() + 1, date.getDate(), 12, 0, 0);
    return ganZhiCycle.indexOf(solar.getLunar().getDayInGanZhi());
}

function previousUpperFuTouDate(date) {
    let cursor = localDateOnly(date);
    for (let i = 0; i < 16; i += 1) {
        const index = dayGanZhiIndex(cursor);
        if (index >= 0 && index % 15 === 0) return cursor;
        cursor = new Date(cursor.getTime() - 86400000);
    }
    throw new Error("没有找到置闰法上元符头。");
}

function qimenSolsticeStart(solsticeDate) {
    const prev = previousUpperFuTouDate(solsticeDate);
    return daysBetween(prev, solsticeDate) >= 9 ? new Date(prev.getTime() + 15 * 86400000) : prev;
}

function buildZhirunSchedule(year) {
    const result = [];
    [year - 1, year, year + 1].forEach((itemYear) => {
        const winterStart = qimenSolsticeStart(solarTermDate(itemYear, "冬至"));
        zhirunYangTerms.forEach((term, index) => {
            result.push({ term, start: new Date(winterStart.getTime() + index * 15 * 86400000), dun: "阳遁" });
        });

        const summerStart = qimenSolsticeStart(solarTermDate(itemYear, "夏至"));
        zhirunYinTerms.forEach((term, index) => {
            result.push({ term, start: new Date(summerStart.getTime() + index * 15 * 86400000), dun: "阴遁" });
        });
    });
    return result.sort((a, b) => a.start - b.start);
}

function getZhirunJuInfo(currentDate) {
    const qimenDate = localDateOnly(currentDate);
    const schedule = buildZhirunSchedule(qimenDate.getFullYear());
    const index = schedule.findIndex((item, itemIndex) => {
        const next = schedule[itemIndex + 1];
        return next && item.start <= qimenDate && qimenDate < next.start;
    });
    if (index < 0) throw new Error("置闰法节气表范围不足。");

    const current = schedule[index];
    const next = schedule[index + 1];
    let offset = daysBetween(current.start, qimenDate);
    let isLeap = false;
    if (offset >= 15) {
        isLeap = true;
        offset -= 15;
    }
    const yuanIndex = Math.floor(offset / 5);
    const table = qimenJuTable[current.term];
    if (!table) throw new Error(`暂未收录 ${current.term} 的局数。`);
    return {
        jieQiName: isLeap ? `闰${current.term}` : current.term,
        realJieQiName: current.term,
        jieQiTime: formatDateTime(current.start),
        nextJieQiName: next.term,
        nextJieQiTime: formatDateTime(next.start),
        yuanIndex,
        dun: current.dun,
        ju: table.ju[yuanIndex],
        dayNumber: offset + 1,
        fuTou: window.Solar.fromYmdHms(current.start.getFullYear(), current.start.getMonth() + 1, current.start.getDate(), 12, 0, 0)
            .getLunar()
            .getDayInGanZhi(),
    };
}

function formatDateTime(date) {
    const pad = (value) => String(value).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function formatInputDateTime(value) {
    return value ? value.replace("T", " ") : "";
}

function juText(value) {
    return ["", "一", "二", "三", "四", "五", "六", "七", "八", "九"][Number(value)] || String(value);
}

function dunJuText(dun, ju) {
    return `${dun}${juText(ju)}局`;
}

function splitGanZhi(ganZhi) {
    return {
        gan: [...(ganZhi || "")][0] || "",
        zhi: [...(ganZhi || "")][1] || "",
    };
}

function renderSiZhuTable(siZhu) {
    const pillars = [siZhu.year, siZhu.month, siZhu.day, siZhu.time].map(splitGanZhi);
    return `
          <table class="sizhu-table" aria-label="四柱">
            <tr><th>年</th><th>月</th><th>日</th><th>时</th></tr>
            <tr>${pillars.map((item) => `<td class="sizhu-gan">${escapeHtml(item.gan)}</td>`).join("")}</tr>
            <tr>${pillars.map((item) => `<td class="sizhu-zhi">${escapeHtml(item.zhi)}</td>`).join("")}</tr>
          </table>
        `;
}

function renderQimenSummary(data) {
    return `
          <div class="qimen-summary">
            <div class="qimen-info-row">
              ${renderSiZhuTable(data.siZhu)}
              <div class="qimen-brief">
                <div class="qimen-jieqi"><span>${escapeHtml(data.jieQiName)}</span><span>${escapeHtml(data.jieQiTime)}</span></div>
                <div class="qimen-jieqi"><span>${escapeHtml(data.nextJieQiName)}</span><span>${escapeHtml(data.nextJieQiTime)}</span></div>
                <div class="qimen-method-note">${escapeHtml(data.methodName)} ${escapeHtml(data.jieQiName)}${escapeHtml(data.yuan)} ${escapeHtml(dunJuText(data.dun, data.ju))}</div>
              </div>
              <div class="qimen-methods" aria-label="定局方法">
                <button class="qimen-method ${qimenMethod === "chaibu" ? "active" : ""}" type="button" data-qimen-method="chaibu">拆补</button>
                <button class="qimen-method ${qimenMethod === "zhirun" ? "active" : ""}" type="button" data-qimen-method="zhirun">置闰</button>
              </div>
            </div>
          </div>
        `;
}

function renderQimenHourNav(data) {
    if (currentArchiveRecord) {
        return `
            <div class="qimen-hour-nav archive-viewing">
              <div class="qimen-current-time">起局时间： ${escapeHtml(data.inputTime)}</div>
            </div>
          `;
    }
    return `
          <div class="qimen-hour-nav">
            <button id="prevQimenHour" type="button">‹ 上一时辰</button>
            <div class="qimen-current-time">起局时间： ${escapeHtml(data.inputTime)}</div>
            <button id="nextQimenHour" type="button">下一时辰 ›</button>
          </div>
        `;
}

function getDiPan(type, number) {
    const result = {};

    if (type === "yang") {
        let gong = number;
        for (let i = 0; i < 9; i += 1) {
            result[String(gong)] = sanQiLiuYi[i];
            gong += 1;
            if (gong === 10) gong = 1;
        }
    } else {
        let gong = number;
        for (let i = 0; i < 9; i += 1) {
            result[String(gong)] = sanQiLiuYi[i];
            gong -= 1;
            if (gong === 0) gong = 9;
        }
    }

    return result;
}

function findGongByStem(map, stem, fallback) {
    for (const gong of Object.keys(map)) {
        if (gong !== "5" && map[gong] === stem) return gong;
    }
    if (map["5"] === stem) return "2";
    return fallback;
}

function findRawGongByStem(map, stem, fallback) {
    for (const gong of Object.keys(map)) {
        if (map[gong] === stem) return gong;
    }
    return fallback;
}

function appendStem(current, stem) {
    if (!stem) return current || "";
    if (!current) return stem;
    return current.includes(stem) ? current : `${current}${stem}`;
}

function applyDiPanZhongToKun(diPan) {
    return {
        ...diPan,
        2: appendStem(diPan["2"], diPan["5"]),
        5: "",
    };
}

function applyTianPanZhongToTianRui(tianPan, zhongStem, stars) {
    const result = { ...tianPan, 5: "" };
    const tianRuiGong = Object.keys(stars).find((gong) => stars[gong] === "天芮") || "2";
    result[tianRuiGong] = appendStem(result[tianRuiGong], zhongStem);
    return result;
}

function getXunShou(lunar) {
    const xunToLiuYi = {
        甲子: "戊",
        甲戌: "己",
        甲申: "庚",
        甲午: "辛",
        甲辰: "壬",
        甲寅: "癸",
    };
    return xunToLiuYi[lunar.getTimeXun()] || "戊";
}

function getKongWang(timeXun) {
    const xunKong = {
        甲子: "戌亥",
        甲戌: "申酉",
        甲申: "午未",
        甲午: "辰巳",
        甲辰: "寅卯",
        甲寅: "子丑",
    };
    return xunKong[timeXun] || "";
}

function getMaXing(timeBranch) {
    if (["申", "子", "辰"].includes(timeBranch)) return "寅";
    if (["寅", "午", "戌"].includes(timeBranch)) return "申";
    if (["巳", "酉", "丑"].includes(timeBranch)) return "亥";
    if (["亥", "卯", "未"].includes(timeBranch)) return "巳";
    return "";
}

function getGongsByBranches(branchText) {
    return [...new Set([...branchText].map((branch) => branchToGong[branch]).filter(Boolean))];
}

function markerStyle(position) {
    return `left:${position.left};top:${position.top};`;
}

function renderOuterMarkers(data) {
    const kongMarkers = data.kongWangBranches
        .map((branch) => {
            const position = outerBranchPositions[branch];
            if (!position) return "";
            return `<span class="outer-marker kong" title="空亡 ${escapeHtml(branch)}" style="${markerStyle(position)}"></span>`;
        })
        .join("");
    const horsePosition = horseBranchPositions[data.maXing] || outerBranchPositions[data.maXing];
    const horseMarker = horsePosition
        ? `<span class="outer-marker horse" title="马星 ${escapeHtml(data.maXing)}" style="${markerStyle(horsePosition)}">♞</span>`
        : "";
    return `${kongMarkers}${horseMarker}`;
}

function distributeTianPan(diPan, xunShou, timeStem, type) {
    const result = {};
    const zhiFuRawGong = findRawGongByStem(diPan, xunShou, "2");
    const zhiFuGong = zhiFuRawGong === "5" ? "2" : zhiFuRawGong;
    const timeStemGong = findGongByStem(diPan, timeStem, zhiFuGong);
    const zhiFuIndex = luoShuOrder.indexOf(zhiFuGong);
    const timeIndex = luoShuOrder.indexOf(timeStemGong);
    const steps =
        type === "yang"
            ? (timeIndex - zhiFuIndex + 8) % 8
            : (zhiFuIndex - timeIndex + 8) % 8;

    for (let i = 0; i < 8; i += 1) {
        const sourceGong = luoShuOrder[i];
        const targetIndex = type === "yang" ? (i + steps) % 8 : (i - steps + 8) % 8;
        result[luoShuOrder[targetIndex]] = diPan[sourceGong];
    }
    result["5"] = "";

    return { tianPan: result, zhongStem: diPan["5"], zhiFuGong, zhiFuRawGong, timeStemGong };
}

function distributeJiuXing(diPan, xunShou, timeStem, type) {
    const zhiFuGong = findGongByStem(diPan, xunShou, "2");
    const timeStemGong = findGongByStem(diPan, timeStem, zhiFuGong);
    const zhiFuXing = basicStars[zhiFuGong];
    const timeIndex = luoShuOrder.indexOf(timeStemGong);
    const starOrder = ["天蓬", "天任", "天冲", "天辅", "天英", "天芮", "天柱", "天心"];
    const starIndex = starOrder.indexOf(zhiFuXing);
    const result = { 5: "" };

    for (let i = 0; i < 8; i += 1) {
        const targetGong = luoShuOrder[(timeIndex + i) % 8];
        result[targetGong] = starOrder[(starIndex + i) % 8];
    }

    return {
        stars: result,
        zhiFuGong: timeStemGong,
        zhiFuXing,
    };
}

function branchDistance(fromBranch, toBranch) {
    const fromIndex = branches.indexOf(fromBranch);
    const toIndex = branches.indexOf(toBranch);
    if (fromIndex < 0 || toIndex < 0) return 0;
    return (toIndex - fromIndex + 12) % 12;
}

function movePalaceByBranch(startGong, steps, type) {
    let gong = Number(startGong);
    for (let i = 0; i < steps; i += 1) {
        if (type === "yang") {
            gong += 1;
            if (gong === 10) gong = 1;
        } else {
            gong -= 1;
            if (gong === 0) gong = 9;
        }
    }
    return gong === 5 ? "2" : String(gong);
}

function distributeBaMen(zhiFuOriginalGong, timeXun, timeBranch, type) {
    const zhiShiMen = basicDoors[zhiFuOriginalGong === "5" ? "2" : zhiFuOriginalGong] || "";
    const xunBranch = timeXun.slice(1);
    const steps = branchDistance(xunBranch, timeBranch);
    const zhiShiGong = movePalaceByBranch(zhiFuOriginalGong, steps, type);
    const timeIndex = luoShuOrder.indexOf(zhiShiGong);
    const doorOrder = ["休门", "生门", "伤门", "杜门", "景门", "死门", "惊门", "开门"];
    const doorIndex = doorOrder.indexOf(zhiShiMen);
    const result = { 5: "" };

    for (let i = 0; i < 8; i += 1) {
        const targetGong = luoShuOrder[(timeIndex + i) % 8];
        result[targetGong] = doorOrder[(doorIndex + i) % 8];
    }

    return { doors: result, zhiShiMen, zhiShiGong };
}

function getDoorOriginalGong(door) {
    return Object.keys(basicDoors).find((gong) => basicDoors[gong] === door && gong !== "5") || "";
}

function doorShortName(door) {
    return shortDoor(door);
}

function splitStems(stems) {
    return [...(stems || "")].filter((stem) => stemChangShengStart[stem]);
}

function uniqueValues(values) {
    return [...new Set(values.filter(Boolean))];
}

function keyingEntry(label, content) {
    if (!content) return `<div class="keying-entry"><b>${escapeHtml(label)}</b>：未收录</div>`;
    if (typeof content === "string") return `<div class="keying-entry"><b>${escapeHtml(label)}</b>：${escapeHtml(content)}</div>`;
    return `
          <div class="keying-entry">
            <b>${escapeHtml(label)} ${escapeHtml(content.name || "")}</b>：${escapeHtml(content.text || "未收录")}
          </div>
        `;
}

function renderGanKeying(data, gong) {
    const store = window.QIMEN_KE_YING?.gan || {};
    const heavenStems = uniqueValues(splitStems(data.tianPan[gong]));
    const lowerStems = uniqueValues([...splitStems(data.diPan[gong]), ...splitStems(data.darkGan[gong])]);
    const entries = [];

    for (const heaven of heavenStems) {
        for (const lowerStem of lowerStems) {
            const key = `${heaven}${lowerStem}`;
            entries.push(keyingEntry(`${heaven}+${lowerStem}`, store[key]));
        }
    }

    return entries.length ? entries.join("") : `<div class="keying-entry">此宫没有可查询的天干组合。</div>`;
}

function renderDoorGanKeying(data, gong) {
    const store = window.QIMEN_KE_YING?.door || {};
    const door = doorShortName(data.doors[gong]);
    const stems = uniqueValues([
        ...splitStems(data.tianPan[gong]),
        ...splitStems(data.diPan[gong]),
        ...splitStems(data.darkGan[gong]),
    ]);
    console.log(stems,store)
    const entries = stems.map((stem) => keyingEntry(`${door}+${stem}`, store[`${door}加${stem}`]));
    return entries.length ? entries.join("") : `<div class="keying-entry">此宫没有可查询的门干组合。</div>`;
}

function renderDoorDoorKeying(data, gong) {
    const store = window.QIMEN_KE_YING?.door || {};
    const currentDoor = doorShortName(data.doors[gong]);
    const originalDoor = doorShortName(basicDoors[gong]);

    return keyingEntry(`${currentDoor}+${originalDoor}`, store[`${currentDoor}加${originalDoor}`]);
}

function renderBaMenKeying(data, gong) {
    return `${renderDoorGanKeying(data, gong)}${renderDoorDoorKeying(data, gong)}`;
}

function sameStemYinYang(first, second) {
    return yangStems.has(first) === yangStems.has(second);
}

function isFiveNoMeet(data) {
    const timeElement = stemElement[data.timeStem];
    const dayElement = stemElement[data.dayStem];
    return Boolean(
        timeElement &&
        dayElement &&
        sameStemYinYang(data.timeStem, data.dayStem) &&
        elementControls[timeElement] === dayElement,
    );
}

function isDoorFuYin(data) {
    return luoShuOrder.every((gong) => data.doors[gong] === basicDoors[gong]);
}

function isStarFuYin(data) {
    return luoShuOrder.every((gong) => data.stars[gong] === basicStars[gong]);
}

function isDoorFanYin(data) {
    return luoShuOrder.every((gong) => data.doors[oppositePalace[gong]] === basicDoors[gong]);
}

function isStarFanYin(data) {
    return luoShuOrder.every((gong) => data.stars[oppositePalace[gong]] === basicStars[gong]);
}

function findGongByDoor(doors, door) {
    return luoShuOrder.find((gong) => doors[gong] === door) || "";
}

function findGongByStar(stars, star) {
    return luoShuOrder.find((gong) => stars[gong] === star) || "";
}

function isSmallFuYin(data) {
    return luoShuOrder.some((originalGong) => {
        const starGong = findGongByStar(data.stars, basicStars[originalGong]);
        const doorGong = findGongByDoor(data.doors, basicDoors[originalGong]);
        return starGong && starGong === doorGong && starGong !== originalGong && starGong !== oppositePalace[originalGong];
    });
}

function isSmallFanYin(data) {
    return luoShuOrder.some((gong) => {
        const originalDoorGong = getDoorOriginalGong(data.doors[gong]);
        const oppositeStar = basicStars[oppositePalace[originalDoorGong]];
        return Boolean(originalDoorGong && oppositeStar && data.stars[gong] === oppositeStar);
    });
}

function getSpecialPattern(data) {
    const items = [];
    const doorFuYin = isDoorFuYin(data);
    const starFuYin = isStarFuYin(data);
    const doorFanYin = isDoorFanYin(data);
    const starFanYin = isStarFanYin(data);
    const smallFuYin = isSmallFuYin(data);
    const smallFanYin = isSmallFanYin(data);

    if (isFiveNoMeet(data)) {
        items.push({ name: "五不遇时-百事皆凶", text: "" });
    }

    if (doorFuYin && starFuYin) {
        items.push({ name: "星门大伏吟", text: "利主不利客，利静不利动。内外一致举步维艰，内因停滞，外因也不作为。" });
    } else if (doorFuYin && starFanYin) {
        items.push({ name: "门伏吟，星反吟", text: "表面看起来风平浪静，实际内部已经酝酿着大的变化。" });
    } else {
        if (doorFuYin) items.push({ name: "门伏吟", text: "利主不利客，利静不利动。表面停止，但内部还在运作。" });
        if (starFuYin && !doorFanYin) {
            items.push({ name: "星伏吟", text: "利主不利客，利静不利动。表面还在运作，实际内部郁结，趋势进展缓慢。" });
        }
        if (smallFuYin && !doorFuYin && !starFuYin) {
            items.push({ name: "星门小伏吟", text: "原始宫位的星门共同落在其他宫位。" });
        }
    }

    if (doorFanYin && starFanYin) {
        items.push({ name: "星门大反吟", text: "利客不利主，主速度快，事情反复明显。事物的内外因素都发生了变化，正处于大动荡时期。" });
    } else if (doorFanYin && starFuYin) {
        items.push({ name: "门反吟，星伏吟", text: "表面看起来变化快，乱糟糟的，其实大局稳定。" });
    } else {
        if (doorFanYin) items.push({ name: "门反吟", text: "利客不利主，主速度快，事情多反复。表面看起来变化大，实际内部平静。" });
        if (starFanYin && !doorFuYin) {
            items.push({
                name: "星反吟",
                text: "利客不利主，主速度快，主事情反复。表面看没事，实际内部已经产生了剧烈变化。",
            });
        }
        if (smallFanYin && !doorFanYin && !starFanYin) {
            items.push({ name: "星门小反吟", text: "门加原始宫位对冲之九星。" });
        }
    }

    return items.length ? items : [{ name: "常局", text: "" }];
}

function renderSpecialPattern(data) {
    return `
          <div class="special-panel">
            ${getSpecialPattern(data)
        .map((item) => `<div><b>${escapeHtml(item.name)}</b>${item.text ? `：${escapeHtml(item.text)}` : ""}</div>`)
        .join("")}
          </div>
        `;
}

function distributeDarkGan(doors, diPan) {
    const result = { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "" };

    for (const gong of Object.keys(doors)) {
        const originalGong = getDoorOriginalGong(doors[gong]);
        result[gong] = originalGong ? diPan[originalGong] || "" : "";
    }

    return result;
}

function distributeBaShen(zhiFuGong, type) {
    const gods = ["值符", "腾蛇", "太阴", "六合", "白虎", "玄武", "九地", "九天"];
    const order =
        type === "yang"
            ? ["1", "8", "3", "4", "9", "2", "7", "6"]
            : ["1", "6", "7", "2", "9", "4", "3", "8"];
    const result = { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "" };
    const startGong = zhiFuGong === "5" ? "2" : zhiFuGong;
    const startIndex = order.indexOf(startGong);

    for (let i = 0; i < 8; i += 1) {
        result[order[(startIndex + i) % 8]] = gods[i];
    }

    return result;
}

function shortGod(god) {
    return god || "";
}

function shortDoor(door) {
    const map = {
        开门: "开",
        休门: "休",
        生门: "生",
        伤门: "伤",
        杜门: "杜",
        景门: "景",
        死门: "死",
        惊门: "惊",
    };
    return map[door] || "";
}

function shortStar(star) {
    const map = {
        天蓬: "蓬",
        天任: "任",
        天冲: "冲",
        天辅: "辅",
        天英: "英",
        天芮: "芮禽",
        天禽: "禽",
        天柱: "柱",
        天心: "心",
    };
    return map[star] || "";
}

function renderStarText(star) {
    if (star === "天芮") return `芮<span class="tian-qin">禽</span>`;
    return escapeHtml(shortStar(star));
}

function stemColorStyle(stem) {
    return `--stem-color:${stemElementColors[stem] || "#111"}`;
}

function renderColoredStems(stemsText, extraClass = "") {
    return [...(stemsText || "")]
        .map((stem) => `<span${extraClass ? ` class="${extraClass}"` : ""} style="${stemColorStyle(stem)}">${escapeHtml(stem)}</span>`)
        .join("");
}

function renderHeavenStemText(data, gong) {
    const stems = [...(data.tianPan[gong] || "")];
    if (data.stars[gong] !== "天芮" || stems.length < 2) return renderColoredStems(data.tianPan[gong]);
    return `${renderColoredStems(stems[0])}${renderColoredStems(stems.slice(1).join(""), "tian-qin")}`;
}

function getStemChangSheng(stem, branch) {
    const startBranch = stemChangShengStart[stem];
    if (!startBranch || !branch) return "";
    const startIndex = branches.indexOf(startBranch);
    const branchIndex = branches.indexOf(branch);
    if (startIndex < 0 || branchIndex < 0) return "";
    const offset = yangStems.has(stem)
        ? (branchIndex - startIndex + 12) % 12
        : (startIndex - branchIndex + 12) % 12;
    return changShengNames[offset] || "";
}

function firstStem(stems) {
    return [...(stems || "")].find((stem) => stemChangShengStart[stem]) || "";
}

function yinYangBranchByStem(gong, stem) {
    const branchPair = palaceYinYangBranch[gong];
    if (!branchPair || !stem) return palaceMainBranch[gong];
    return yangStems.has(stem) ? branchPair.yang : branchPair.yin;
}

function getStemStateBranch(stem, gong, kind, data) {
    if (kind === "earth" && palaceYinYangBranch[gong]) {
        return yinYangBranchByStem(gong, firstStem(data.tianPan[gong]));
    }

    if (kind === "heaven" && palaceYinYangBranch[gong]) {
        return yinYangBranchByStem(gong, firstStem(data.diPan[gong]));
    }

    return palaceMainBranch[gong];
}

function getStemStates(stems, gong, kind, data) {
    return [...(stems || "")]
        .map((stem) => getStemChangSheng(stem, getStemStateBranch(stem, gong, kind, data)))
        .join("");
}

function getDoorState(door, gong) {
    const itemElement = doorElements[door];
    const gongElement = palaceElement[gong];
    if (!itemElement || !gongElement) return "";
    if (itemElement === gongElement) return "旺";
    if (elementGenerates[gongElement] === itemElement) return "相";
    if (elementGenerates[itemElement] === gongElement) return "休";
    if (elementControls[itemElement] === gongElement) return "囚";
    if (elementControls[gongElement] === itemElement) return "死";
    return "";
}

function getStarState(star, gong) {
    const itemElement = starElements[star];
    const gongElement = palaceElement[gong];
    if (!itemElement || !gongElement) return "";
    if (elementGenerates[itemElement] === gongElement) return "旺";
    if (itemElement === gongElement) return "相";
    if (elementGenerates[gongElement] === itemElement) return "废";
    if (elementControls[itemElement] === gongElement) return "休";
    if (elementControls[gongElement] === itemElement) return "囚";
    return "";
}

function buildDateResult(value) {
    if (!window.Solar?.fromYmdHms) throw new Error("本地历法库没有加载成功。");
    if (!window.iztro?.astro) throw new Error("本地 iztro 没有加载成功。");

    const { year, month, day, hour, minute } = parseDateTime(value);
    const solar = window.Solar.fromYmdHms(year, month, day, hour, minute, 0);
    const lunar = solar.getLunar();
    const eightChar = lunar.getEightChar();
    const bazi = [
        eightChar.getYear(),
        eightChar.getMonth(),
        eightChar.getDay(),
        eightChar.getTime(),
    ].join(" ");

    const createAstrolabe = window.iztro.astro.bySolar || window.iztro.astro.astrolabeBySolarDate;
    const astrolabe = createAstrolabe(value.slice(0, 10), 0, "男", true, "zh-CN");

    return {
        lunar: lunar.toString(),
        bazi,
        ziwei: astrolabe.chineseDate,
    };
}

function renderCalendar() {
    try {
        const data = buildDateResult(calendarDate.value);
        calendarResult.innerHTML = `
            <div class="item"><div class="label">农历</div><div class="value">${escapeHtml(data.lunar)}</div></div>
            <div class="item"><div class="label">八字四柱</div><div class="value">${escapeHtml(data.bazi)}</div></div>
            <div class="item"><div class="label">紫微干支</div><div class="value">${escapeHtml(data.ziwei)}</div></div>
          `;
    } catch (error) {
        calendarResult.innerHTML = `<div class="error">${escapeHtml(error.message)}</div>`;
    }
}

function renderQimenBoard(data) {
    return `
          <div class="qimen-board-wrap">
            <div class="qimen-board">
              ${boardOrder
        .map((gong) => {
            if (gong === "5") {
                return `
                      <div class="qimen-palace center-palace">
                        <strong>${escapeHtml(dunJuText(data.dun, data.ju))}</strong>
                        <span>值符：${escapeHtml(data.zhiFuXing)}</span>
                        <span>值使：${escapeHtml(data.zhiShiMen)}</span>
                        <span class="center-earth-stem">${renderColoredStems(data.centerDiPanStem)}</span>
                      </div>
                    `;
            }

            const isTianQinGong = data.stars[gong] === "天芮";
            const heavenStemClass = isTianQinGong ? "stem-heaven stem-horizontal" : "stem-heaven";
            const earthStemClass = gong === "2" ? "stem-earth stem-horizontal" : "stem-earth";

            return `
                    <div class="qimen-palace" data-gong="${gong}" role="button" tabindex="0" title="点击查看克应">
                      <span class="bagua-watermark">${escapeHtml(congenitalBaguaByGong[gong] || "")}</span>
                      <span class="dark-stem">${renderColoredStems(data.darkGan[gong])}</span>
                      <span class="god">${escapeHtml(shortGod(data.gods[gong]))}</span>
                      <span class="star">${renderStarText(data.stars[gong])}</span>
                      <span class="star-state">${escapeHtml(getStarState(data.stars[gong], gong))}</span>
                      <span class="door">${escapeHtml(shortDoor(data.doors[gong]))}</span>
                      <span class="door-state">${escapeHtml(getDoorState(data.doors[gong], gong))}</span>
                      <span class="${heavenStemClass}" title="天盘干">${renderHeavenStemText(data, gong)}</span>
                      <span class="stem-heaven-state">${escapeHtml(getStemStates(data.tianPan[gong], gong, "heaven", data))}</span>
                      <span class="${earthStemClass}" title="地盘干">${renderColoredStems(data.diPan[gong])}</span>
                      <span class="stem-earth-state">${escapeHtml(getStemStates(data.diPan[gong], gong, "earth", data))}</span>
                      <span class="earth-god" title="地八神">${escapeHtml(shortGod(data.earthGods[gong]))}</span>
                    </div>
                  `;
        })
        .join("")}
            </div>
            ${renderOuterMarkers(data)}
          </div>
        `;
}

function renderPalaceKeying(data, gong) {
    return `
          <h3>${escapeHtml(palaceNames[gong])}：${escapeHtml(palaceKeyingNumbers[gong] || "")}</h3>
          <div class="keying-section">
            <strong>天干克应</strong>
            ${renderGanKeying(data, gong)}
          </div>
          <div class="keying-section">
            <strong>八门克应</strong>
            ${renderBaMenKeying(data, gong)}
          </div>
        `;
}

function bindQimenPalaceClicks(data) {
    const panel = document.querySelector("#palaceKeying");
    document.querySelectorAll(".qimen-palace[data-gong]").forEach((palace) => {
        const show = () => {
            document.querySelectorAll(".qimen-palace.selected").forEach((item) => item.classList.remove("selected"));
            palace.classList.add("selected");
            panel.innerHTML = renderPalaceKeying(data, palace.dataset.gong);
        };
        palace.addEventListener("click", show);
        palace.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                show();
            }
        });
    });
}

function shiftQimenHour(direction) {
    const value = currentQimenChartTime || qimenDateTime.value || dateTimeText();
    const { year, month, day, hour, minute } = parseDateTime(value);
    const nextDate = new Date(year, month - 1, day, hour + direction * 2, minute, 0);
    renderQimen(dateTimeText(nextDate));
}

function renderArchiveInfo(record) {
    if (!record) return "";
    return `
          <div class="archive-info-panel">
            <div class="archive-info-row"><b>姓名</b><span>${escapeHtml(record.person || "--")}</span></div>
          </div>
        `;
}

async function requestQimen(value) {
    const endpoint = window.QIMEN_API_URL || "https://mopu.top/api/qimen";
    let response;
    try {
        response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ date: value, method: qimenMethod }),
        });
    } catch {
        throw new Error("起局服务暂时无法连接，请稍后重试。");
    }
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.msg || "起局服务返回异常。");
    if (typeof payload.status === "number" && payload.status !== 200) throw new Error(payload.msg || "起局服务返回异常。");
    return payload.data || payload;
}

async function renderQimen(value = qimenDateTime.value) {
    try {
        const chartTime = value || dateTimeText();
        currentQimenChartTime = chartTime;
        const response = await requestQimen(chartTime);
        const data = response.charts?.[qimenMethod] || response;
        if (!data) throw new Error("起局服务未返回当前定局方法的数据。");
        qimenResult.innerHTML = `
            ${renderQimenHourNav(data)}
            ${renderQimenSummary(data)}
            ${renderQimenBoard(data)}
            <div class="qimen-footnote">旬首：${escapeHtml(data.timeXun)}${escapeHtml(data.xunShou)}　空亡：${escapeHtml(data.kongWang)}　马星：${escapeHtml(data.maXing)}</div>
            ${renderSpecialPattern(data)}
            <div id="palaceKeying" class="keying-panel">点击任一宫，查看此宫的天干克应、八门克应。</div>
            ${renderArchiveInfo(currentArchiveRecord)}
          `;
        bindQimenPalaceClicks(data);
        document.querySelector("#prevQimenHour")?.addEventListener("click", () => shiftQimenHour(-1));
        document.querySelector("#nextQimenHour")?.addEventListener("click", () => shiftQimenHour(1));
        document.querySelectorAll("[data-qimen-method]").forEach((button) => {
            button.addEventListener("click", () => {
                qimenMethod = button.dataset.qimenMethod;
                renderQimen(currentQimenChartTime);
            });
        });
        updateBottomMenuState("qimen");
    } catch (error) {
        qimenResult.innerHTML = `<div class="error">${escapeHtml(error.message)}</div>`;
        updateBottomMenuState("qimen");
    }
}

document.querySelector("#queryCalendar").addEventListener("click", renderCalendar);
document.querySelector("#calendarNow").addEventListener("click", () => {
    calendarDate.value = dateTimeText();
    renderCalendar();
});
document.querySelector("#calcQimen").addEventListener("click", () => {
    currentArchiveRecord = null;
    renderQimen(qimenDateTime.value);
});
qimenCustomTime.addEventListener("click", enableQimenManualTime);
qimenDateTime.addEventListener("input", () => {
    qimenManualTime = true;
    currentQimenChartTime = "";
    currentArchiveRecord = null;
});
document.querySelector("#openPatterns81").addEventListener("click", () => {
    renderPatterns81();
    showView("patterns81");
});
document.querySelector("#closePatterns81").addEventListener("click", () => showView("qimen"));
patterns81Selector.addEventListener("click", (event) => {
    const button = event.target.closest("[data-pattern-stem]");
    if (!button) return;
    if (button.dataset.patternLayer === "upper") selectedUpperStem = button.dataset.patternStem;
    if (button.dataset.patternLayer === "lower") selectedLowerStem = button.dataset.patternStem;
    renderPatterns81();
});
document.querySelector("#openBazi").addEventListener("click", () => showView("bazi"));
document.querySelector("#openQimen").addEventListener("click", () => showView("qimen"));
openAuthorModal.addEventListener("click", () => setAuthorModal(true));
closeAuthorModal.addEventListener("click", () => setAuthorModal(false));
authorModal.addEventListener("click", (event) => {
    if (event.target === authorModal) setAuthorModal(false);
});
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && authorModal.classList.contains("open")) setAuthorModal(false);
});
window.addEventListener("message", (event) => {
    if (event.data?.type === "bazi-back-home") showView("home");
});
openArchiveButton.addEventListener("click", () => {
    archiveMessage.textContent = "";
    if (currentArchiveRecord) {
        archivePerson.value = currentArchiveRecord.person || "";
    } else {
        archiveForm.reset();
    }
    showView("archive");
});
openQueryButton.addEventListener("click", async () => {
    try { await syncArchivesFromApi(); } catch { /* 服务不可用时仍展示本地旧存档 */ }
    showView("query");
});
archiveForm.addEventListener("submit", (event) => {
    event.preventDefault();
    saveCurrentArchive();
});
let archiveSearchTimer = 0;
archiveSearch.addEventListener("input", () => {
    window.clearTimeout(archiveSearchTimer);
    archiveSearchTimer = window.setTimeout(() => {
        syncArchivesFromApi(archiveSearch.value.trim()).catch((error) => {
            archiveMessage.textContent = error.message || "查询存档失败。";
        });
    }, 250);
});
selectArchiveMode.addEventListener("click", toggleArchiveSelectMode);
deleteArchive.addEventListener("click", deleteSelectedArchives);
document.querySelector("[data-query-back]").addEventListener("click", () => showView(sourceReturnView || "home"));
document.querySelector("[data-source-back]").addEventListener("click", () => showView("qimen"));
document.querySelector("[data-qimen-back]").addEventListener("click", handleQimenBack);
document.querySelectorAll("[data-back]").forEach((button) => {
    button.addEventListener("click", () => showView("home"));
});

calendarDate.value = dateTimeText();
qimenDateTime.value = dateTimeText();
renderCalendar();
renderPatterns81();
updateQimenCurrentTime();
setInterval(updateQimenCurrentTime, 1000);
