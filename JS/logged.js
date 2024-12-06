import { query } from "./Const/query.js"
import { rank } from "./Const/ranks.js"
import { auditComments } from "./Const/auditComment.js"
import { updCSS } from "./Function/updCSS.js"
import { f } from "./Function/f.js"
import { fetcheDatasUser } from "./Getter/FetchData.js"
import { getXpNextLvl } from "./Getter/getXpNextLvl.js"
import { getLvl } from "./Getter/getLvl.js"
import { getExp } from "./Getter/getEXP.js"
import { getCurrentExercice } from "./Getter/getExercise.js"
import { getLastExerciceStarted } from "./Getter/getExercise.js"
import { getAllProjectSorted  } from "./Getter/getAllProjectSorted.js"
import { createClassementSVG } from "./Graph/createClassementSVG.js"
import { createXPsvg } from "./Graph/createXPsvg.js"
import { GetTalentLvl } from "./Getter/getTalentLvl.js"

export const Logged = async(JWT) => {
    updCSS(['CSS/logged.css']);

    const data = await fetcheDatasUser('https://zone01normandie.org/api/graphql-engine/v1/graphql', `Bearer ${JWT}`, query)

    //const audit
    const auditRatio = data.data.user[0].auditRatio
    const auditRatioDone = data.data.user[0].totalUp
    const auditRatioReceived = data.data.user[0].totalDown

    const EXPamount = getExp(data.data.user[0].xps)

    //const lvl & rank
    const lvl = getLvl(data.data.transaction);
    const nextLevel = f(lvl+1) - EXPamount > 0 ? f(lvl+1) - EXPamount : 0
    const nextLevelRounded = getXpNextLvl(nextLevel, 1)
    const currentRank = rank[Math.floor(lvl/10) < 6 ? Math.floor(lvl/10) : 6]
    const nextRank = 10 - (lvl % 10)

    const currentExercise = getCurrentExercice(data.data.result)
    const lastExercise = currentExercise ? currentExercise : getLastExerciceStarted(data.data.result)

    console.log(currentExercise)
    console.log(lastExercise.object.name)
    document.body.innerHTML = `
        <div class="trame"></div>
        <div class="navBar">
            <div class="logo"></div>
            <div class="link0">INTRA</div>
            <div class="link1"> > </div>
            <div class="link2">${data.data.user[0].campus.toUpperCase()}</div>
            <div class="link3"> > </div>
            <div class="link4">PROFILE</div>

            <div class="giteaSVG" id="giteaSVG"></div>
            <div class="gitea" id="gitea">GITEA</div>

            <div class="profile"></div>
            <div class="userName">${data.data.user[0].login}</div>
            <div class="logout" id="logout"></div>
        </div>

        <div class="body">
            <div class="hello">Welcome, ${data.data.user[0].attrs.firstName} ${data.data.user[0].attrs.lastName}!</div>
            <div class="allData" id="allData">
            </div>

            <div class="container_current_rank">
                <div class="currentRankSpan">Current rank</div>
                <div class="currentRank">${currentRank}</div>
                <div class="line"></div>
                <br>
                <div class="nextRank">Next rank in ${nextRank === 1 ? `${nextRank} level` : `${nextRank} levels`}</div>
                <br>
                <div class="circle">
                    <div class="levelSpan">Level</div>
                    <div class="level">${lvl}</div>
                </div>
                <div class="nextLevel">Next level in ${nextLevelRounded}</div>
            </div>

            <div class="WhatUp">
                <div class="what">What's Up</div>
                <div class="resume">
                    <span class="arrow">→</span>
                    <span class="resumeExercice">resume <u>${lastExercise.object.name}</u></span>
                </div>
            </div>

            <div class="divRatio">
                <div class="ratioSpan">Audits ratio</div>

                <div class="barRatioDone"></div>
                <div class="amountRatioDone">${getXpNextLvl(auditRatioDone, 1)} Done ↑</div>

                <div class="barRatioReceived" style="background: ${auditComments[auditRatio.toFixed(1)][1]}"></div>
                <div class="amountRatioReceived">${getXpNextLvl(auditRatioReceived, 1)} Received ↓</div>

                <div class="ratio" style="color: ${auditComments[auditRatio.toFixed(1)][1]}">${auditRatio.toFixed(1)} <span class="ratioComment">${auditComments[auditRatio.toFixed(1)][0]}</span></div>
            </div>

            <div class="xp">
                <div class="xpAmount">${EXPamount}<span style="color: #CAADFF"></span> </div>
                <div class="lastActivitySpan">Last activity</div>
                <div class="line"></div>
                <div class="fourExercices"></div>
            </div>

            <div class="currentAudit">
                <div class="currentAuditTitle">Audits</div>
                <div class="currentAuditTodo"></div>
            </div>

            <div class="XPprogression">
                <div class="title">XP progression</div>
                <div class="totalXP">Total <br> ${getXpNextLvl(EXPamount, 2)}</div>
                <div class="svg" id="XPsvg"></div>
            </div>

            <div class="bestSkills">
                <div class="title">Best skills</div>
                <div class="description">Here are your skills with the highest completion rate among all categories.</div>
                <div class="svg" id="SkillSVG"></div>
            </div>

            <div class="usersByXP">
                <div class="userByXPtitle">Distribution of users by XP</div>
                <div class="svg" id="UsersByXP"></div>
                <div class="description" id="svgDescription"></div>
                <div class="level">Level</div>
            </div>
        </div>
    `

    const circle = document.getElementsByClassName("circle")[0]
    circle.style.height = circle.getBoundingClientRect().width + "px"
    const barRatioDone = document.getElementsByClassName('barRatioDone')[0]
    const barRatioReceived = document.getElementsByClassName('barRatioReceived')[0]

    if (auditRatioDone < auditRatioReceived) {
        barRatioDone.style.width = '50%'
        barRatioReceived.style.width = `${auditRatioReceived*100/auditRatioDone / 2}%`
    } else {
        barRatioReceived.style.width = '50%'
        barRatioDone.style.width = `${auditRatioDone*100/auditRatioReceived / 2}`
    }

    createXPsvg(getAllProjectSorted(data.data.transaction), EXPamount)
    createClassementSVG(GetTalentLvl(data.data.event_user), lvl)

    document.getElementById('logout').addEventListener('click', () => {
        location.reload()
    })

    document.getElementById('gitea').addEventListener('click', () => {
        window.open(`https://zone01normandie.org/git/${data.data.user[0].login}`)
    })

    document.getElementById('giteaSVG').addEventListener('click', () => {
        window.open(`https://zone01normandie.org/git/${data.data.user[0].login}`)
    })
}
