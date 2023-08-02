const userFormEl = document.querySelector('#user-form')
const nameInputEl = document.querySelector('#username')
const proxyUrl = 'https://octoproxymus.herokuapp.com?secret=walrus&url='

const skillIcons = {
    overall: 'https://www.runescape.com/img/rsp777/hiscores/skill_icon_overall1.gif',
    attack: 'https://www.runescape.com/img/rsp777/hiscores/skill_icon_attack1.gif',
    strength: 'https://www.runescape.com/img/rsp777/hiscores/skill_icon_strength1.gif',
    defence: 'https://www.runescape.com/img/rsp777/hiscores/skill_icon_defence1.gif',
    ranged: 'https://www.runescape.com/img/rsp777/hiscores/skill_icon_ranged1.gif',
    prayer: 'https://www.runescape.com/img/rsp777/hiscores/skill_icon_prayer1.gif',
    magic: 'https://www.runescape.com/img/rsp777/hiscores/skill_icon_magic1.gif',
    cooking: 'https://www.runescape.com/img/rsp777/hiscores/skill_icon_cooking1.gif',
    woodcutting: 'https://www.runescape.com/img/rsp777/hiscores/skill_icon_hwoodcutting1.gif',
    fletching: 'https://www.runescape.com/img/rsp777/hiscores/skill_icon_fletching1.gif',
    fishing: 'https://www.runescape.com/img/rsp777/hiscores/skill_icon_fishing1.gif',
    firemaking: 'https://www.runescape.com/img/rsp777/hiscores/skill_icon_firemaking1.gif',
    crafting: 'https://www.runescape.com/img/rsp777/hiscores/skill_icon_crafting1.gif',
    smithing: 'https://www.runescape.com/img/rsp777/hiscores/skill_icon_smithing1.gif',
    mining: 'https://www.runescape.com/img/rsp777/hiscores/skill_icon_mining1.gif',
    herblore: 'https://www.runescape.com/img/rsp777/hiscores/skill_icon_herblore1.gif',
    agility: 'https://www.runescape.com/img/rsp777/hiscores/skill_icon_agility1.gif',
    theiving: 'https://www.runescape.com/img/rsp777/hiscores/skill_icon_theiving1.gif',
    slayer: 'https://www.runescape.com/img/rsp777/hiscores/skill_icon_slayer1.gif',
    farming: 'https://www.runescape.com/img/rsp777/hiscores/skill_icon_farming1.gif',
    runecraft: 'https://www.runescape.com/img/rsp777/hiscores/skill_icon_runecraft1.gif',
    hunter: 'https://www.runescape.com/img/rsp777/hiscores/skill_icon_hunter1.gif',
    construction: 'https://www.runescape.com/img/rsp777/hiscores/skill_icon_construction1.gif',
}

const formSubmitHandler = event => {
    event.preventDefault()
    let username = nameInputEl.value.trim()
    console.log(username)
    if (username) {
        getHighscores(username)
        nameInputEl.value = ''
    } else {
        alert('Please enter a valid RSN')
    }
}

const getHighscores = username => {   
    let apiUrl = encodeURI('https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player=' + username)
    
    fetch(proxyUrl + apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const skills = data.split('\n')
            const ranks = []
            const levels = []
            const xps = []

            skills.forEach(skill => {
                const [rank, level, xp] = skill.split(',')
                ranks.push(rank)
                levels.push(level)
                xps.push(xp)
            })

            populateColumns(ranks, levels, xps)

        }) 
        .catch(err => console.log(err))
}

const populateColumns = (ranks, levels, xps) => {
    const rankColumn = document.querySelector('.rankColumn')
    const levelColumn = document.querySelector('.levelColumn')
    const xpColumn = document.querySelector('.xpColumn')
    // const skillColumn = document.querySelector('.skillColumn')

    // Clear existing data
    rankColumn.innerHTML = '<h4 class="rank">Rank</h4>'
    levelColumn.innerHTML = '<h4 class="level">Level</h4>'
    xpColumn.innerHTML = '<h4 class="xp">XP</h4>'
    // skillColumn.innerHTML = '<h4 class="skill">Skill</h4>'

    // Append data to the columns
    for (let i = 0; i < ranks.length; i++) {
        rankColumn.innerHTML += `<p>${ranks[i]}</p>`
        levelColumn.innerHTML += `<p>${levels[i]}</p>`
        xpColumn.innerHTML += `<p>${xps[i]}</p>`
        // // Get the skill name (ignore the first element, which is "Overall")
        // const skillName = skillColumn.children[i + 1].textContent.toLowerCase();

        // // Get the corresponding skill icon URL
        // const iconUrl = skillIcons[skillName];

        // // Add the skill icon to the skill column
        // skillColumn.children[i + 1].innerHTML = `<img src="${iconUrl}"> ${skillColumn.children[i + 1].textContent}`;
    }
}

// sort through data and display in table
userFormEl.addEventListener('submit', formSubmitHandler)


// 'https://www.runescape.com/img/rsp777/hiscores/skill_icon_strength1.gif'