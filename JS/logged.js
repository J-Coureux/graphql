import { fetchDatas2 } from "../../graphqlA/js/getdatas/fetchDatas.js"
import { query } from "./query.js"
import { updCSS } from "./updCSS.js"

export const Logged = async(JWT) => {
    updCSS(['CSS/logged.css']);
    const data = await fetchDatas2('https://zone01normandie.org/api/graphql-engine/v1/graphql', `Bearer ${JWT}`, query)
    console.log("data :", data);
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
            <div class="userName"></div>
            <div class="logout" id="logout"></div>
        </div>
        
        <div class="body">
            <div class="hello">Welcome, ${data.data.user[0].attrs.firstName} ${data.data.user[0].attrs.lastName}!</div>
            <div class="allData" id="allData">
                <div class="reverse">
                    <div></div>
                </div>
            </div>

            <div class="currentAudit">
                <div class="currentAuditTitle">Audits</div>
                <div class="currentAuditTodo"></div>
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
}