// ==UserScript==
// @name         AdminTheme Anime Category
// @match        https://animemusicquiz.com/admin/fixAnimeCategory*
// ==/UserScript==

var shouldCloseSidebarOnClick = false
var backgroundImage = "https://i.imgur.com/5uCpCDs.jpg"

setup()

function setup() {
    changeMainMenuBackgroundImage()
    setupPageTopBar()
    setupNavigationSidebar()
    removeOldNavigationBar()

    setupAnimeList()
    setupCategories()
    fixInputs()
    collapseWell()
}

function changeMainMenuBackgroundImage() {
    document.body.style.setProperty('background-image', 'url(' + backgroundImage + ')')
    document.body.style.setProperty('background-image', '-webkit-image-set(url(' + backgroundImage + ') 1x, url(' + backgroundImage + ') 2x)')
    document.body.style.backgroundSize = "cover"
    document.getElementsByTagName("html")[0].style.height = "100%"
}

function setupPageTopBar() {
    createTopBar()
    addPageTitle()
    addAdminPagesButton()
}

function createTopBar() {
    var topBar = document.createElement("div")
    topBar.id = "topBar"
    topBar.className = "topMenuBar menuBar"
    topBar.style.textAlign = "center"
    topBar.style.marginBottom = "5%"
    document.body.insertBefore(topBar, document.getElementById("adminPage"))
}

function addPageTitle() {
    var pageTitleButton = document.createElement("div")
    pageTitleButton.id = "pageTitleButton"
    pageTitleButton.className = "topMenuButton topMenuBigButton"
    pageTitleButton.style.paddingLeft = "15px"
    pageTitleButton.style.paddingRight = "15px"
    pageTitleButton.style.width = "440px"
    pageTitleButton.style.display = "inline-block"
    pageTitleButton.style.position = "relative"

    var pageTitleLabel = document.createElement("h1")
    var currentPageTitleElement = document.getElementsByClassName('well')[0].children[0].children[0]
    var pageTitleText = currentPageTitleElement.innerHTML
    pageTitleLabel.innerHTML = pageTitleText
    pageTitleButton.appendChild(pageTitleLabel)

    currentPageTitleElement.remove()

    var topBar = document.getElementById("topBar")
    topBar.appendChild(pageTitleButton)
}

function addAdminPagesButton() {
    var adminPagesButton = document.createElement("div")
    adminPagesButton.className = "clickAble topMenuButton"
    adminPagesButton.style.paddingLeft = "5px"
    adminPagesButton.style.paddingRight = "5px"
    adminPagesButton.style.display = "inline-block"
    adminPagesButton.style.verticalAlign = "top"
    adminPagesButton.style.position = "absolute"
    adminPagesButton.style.left = "0px"
    adminPagesButton.style.borderBottomLeftRadius = "0px"
    adminPagesButton.onclick = function() {
        document.getElementById("sidebar").style.display = "flex"
        shouldCloseSidebarOnClick = false
    }

    var buttonTitle = document.createElement("h5")
    buttonTitle.innerHTML = "Admin pages"
    adminPagesButton.appendChild(buttonTitle)

    var topBar = document.getElementById("topBar")
    topBar.appendChild(adminPagesButton)
}

function setupNavigationSidebar() {
    let sidebar = document.createElement("div")
    sidebar.id = "sidebar"
    sidebar.style.height = "100%"
    sidebar.style.width = "200px"
    sidebar.style.position = "absolute"
    sidebar.style.top = "0"
    sidebar.style.left = "0"
    sidebar.style.background = "#1b1b1b"
    sidebar.style.boxShadow = "rgba(0, 0, 0, 0.3) 8px 0px 10px 0px"
    sidebar.style.display = "none"
    sidebar.style.flexDirection = "column"
    sidebar.style.justifyContent = "center"
    sidebar.style.gap = "1%"
    sidebar.style.overflowY = "overlay"
    document.body.appendChild(sidebar)

    let navigationDestinations = document.getElementById("adminPage").children[0].children[0].children[1].children[0].children
    let count = navigationDestinations.length
    for (var index = 0; index < count; index++) {
        let destination = navigationDestinations[index].children[0]
        destination.style.width = "100%"
        destination.style.background = "#1b1b1b"
        destination.style.color = "#d9d9d9"
        destination.style.textAlign = "center"
        destination.style.fontSize = "large"
        sidebar.appendChild(destination)
    }

    document.body.addEventListener("click", function(event) {
        if (event.target !== sidebar && shouldCloseSidebarOnClick) {
            sidebar.style.display = "none"
        }
        shouldCloseSidebarOnClick = true
    }, false)
}

function removeOldNavigationBar() {
    var oldNavigationBar = document.getElementsByClassName('navbar navbar-default')[0]
    oldNavigationBar.remove()
}

function setupAnimeList() {
    let well = document.getElementsByClassName("well")[0]
    let animeContainer = well.children[0]
    animeContainer.className = "floatingContainer"
    animeContainer.style.color = "white"
    animeContainer.children[4].className = "table"
    animeContainer.children[4].style.marginBottom = "0"
    animeContainer.children[4].children[0].children[0].children[6].style.maxWidth = "95px"

    animeContainer.children[0].children[0].style.width = "30%"
    animeContainer.children[1].children[0].style.width = "30%"
    animeContainer.children[0].className = ""
    animeContainer.children[0].style.display = "flex"
    animeContainer.children[0].style.justifyContent = "space-around"
    animeContainer.children[0].style.paddingTop = "1%"
    animeContainer.children[0].style.paddingBottom = "1%"
    animeContainer.children[0].appendChild(animeContainer.children[1].children[0])
    animeContainer.children[0].appendChild(animeContainer.children[2].children[0])
    animeContainer.children[0].appendChild(animeContainer.children[3].children[0])
    animeContainer.children[1].remove()
    animeContainer.children[1].remove()
    animeContainer.children[1].remove()
    animeContainer.children[2].className = ""
    animeContainer.children[2].style.display = "flex"
    animeContainer.children[2].style.justifyContent = "center"
    animeContainer.children[2].style.margin = "1%"
    animeContainer.children[1].children[0].style.overflow = "auto"
    animeContainer.children[1].children[0].style.maxHeight = "70vh"
    animeContainer.children[1].children[0].style.display = "block"
    animeContainer.children[1].children[0].children[0].style.position = "sticky"
    animeContainer.children[1].children[0].children[0].style.top = "0"
}

function setupCategories() {
    let well = document.getElementsByClassName("well")[0]
    let categoriesContainer = well.children[1]
    categoriesContainer.className = "floatingContainer"
    categoriesContainer.style.color = "white"
    categoriesContainer.style.backgroundColor = "rgb(27, 27, 27)"
    categoriesContainer.style.flexShrink = "0"
    categoriesContainer.children[0].style.textAlign = "center"
    categoriesContainer.children[0].innerHTML = "Categories"
    categoriesContainer.children[1].className = "table"
    categoriesContainer.children[1].id = "categoryList"
    categoriesContainer.children[1].style.marginBottom = "0"
    categoriesContainer.children[1].children[0].children[0].remove()
    categoriesContainer.children[1].children[0].children[0].style.backgroundColor = "rgb(66, 66, 66)"
    let newCategoryRow = categoriesContainer.children[1].insertRow()
    newCategoryRow.insertCell(0).appendChild(categoriesContainer.children[3].children[0])
	newCategoryRow.insertCell(1).appendChild(categoriesContainer.children[4].children[0])
    categoriesContainer.children[2].remove()
    categoriesContainer.children[2].remove()
    categoriesContainer.children[2].remove()
}

function fixInputs() {
    document.querySelectorAll(".category, .categoryNumber, .categoryYear").forEach(input => {
        input.style.color = "black"
    })
    document.querySelectorAll(".hideCategoryNumber, .noCategory").forEach(toggle => {
        toggle.style.width = "100%"
    })
}

function collapseWell() {
    let well = document.getElementsByClassName("well")[0]
    let container = document.getElementById("adminPage")
    container.appendChild(well.children[0])
    container.appendChild(well.children[0])
    well.remove()
    container.style.display = "flex"
    container.style.alignItems = "flex-start"
    container.style.justifyContent = "center"
    container.style.gap = "5%"
    container.style.width = "100%"
    container.style.marginLeft = "0"
    container.style.marginRight = "0"
    container.style.paddingLeft = "0"
    container.style.paddingRight = "0"
}