document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const sections = document.querySelectorAll('.section-content');
    const genericSection = document.getElementById('generic-content');
    const genericTitle = genericSection.querySelector('h1');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const sidebar = document.querySelector('.site-sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    const searchInput = document.getElementById('globalSearch');

    let currentSectionId = 'welcome'; // Default

    // --- Navigation Logic ---

    function navigateTo(targetId, titleText, pushHistory = true, direction = 'forward') {
        const targetSection = document.getElementById(targetId) || genericSection;
        const currentSection = document.querySelector('.section-content:not(.hidden)');
        
        // Prevent navigation to same page if it's already visible
        if (currentSection && currentSection.id === targetId) return;

        // Update Sidebar Active State
        sidebarLinks.forEach(link => {
            if (link.dataset.target === targetId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Determine Animation Classes
        let exitClass = direction === 'back' ? 'page-exit-right' : 'page-exit-left';
        let enterClass = direction === 'back' ? 'page-enter-left' : 'page-enter-right';

        if (currentSection) {
            currentSection.classList.add(exitClass);
            setTimeout(() => {
                currentSection.classList.add('hidden');
                currentSection.classList.remove(exitClass);
                currentSection.classList.remove('cascade-active');
                showNewSection(targetSection, enterClass, titleText);
            }, 220);
        } else {
            showNewSection(targetSection, 'page-enter-right', titleText);
        }

        // History Management
        if (pushHistory) {
            history.pushState({ id: targetId, title: titleText }, '', `#${targetId}`);
        }

        currentSectionId = targetId;
        
        // Close Mobile Menu if open
        closeMobileMenu();
    }

    function showNewSection(section, enterClass, titleText) {
        // Prepare Generic Section if needed
        if (section === genericSection && titleText) {
            genericTitle.textContent = titleText;
        }

        section.classList.remove('hidden');
        section.classList.add(enterClass);
        requestAnimationFrame(() => {
            section.classList.add('cascade-active');
        });

        setTimeout(() => {
            section.classList.remove(enterClass);
        }, 260);

        window.scrollTo(0, 0);
    }

    // --- Event Listeners ---

    // Sidebar Links Click
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.dataset.target;
            const title = link.textContent.trim();
            navigateTo(target, title);
        });
    });

    // Browser Back/Forward Button
    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.id) {
            // Determine direction (simple assumption: popstate usually implies 'back' in this simple context, 
            // or we could track history depth. For now, let's assume 'back' animation for popstate to distinguish it)
            navigateTo(event.state.id, event.state.title, false, 'back');
        } else {
            // Revert to default
            navigateTo('welcome', 'Bem vindo', false, 'back');
        }
    });

    // Initial Load based on Hash
    const initialHash = window.location.hash.substring(1);
    if (initialHash) {
        const link = document.querySelector(`.sidebar-link[data-target="${initialHash}"]`);
        const title = link ? link.textContent.trim() : 'Wiki';
        navigateTo(initialHash, title, false, 'forward');
    } else {
        // Ensure Welcome is active with cascade
        const welcome = document.getElementById('welcome');
        if(welcome) {
            welcome.classList.add('cascade-active');
            history.replaceState({ id: 'welcome', title: 'Bem vindo' }, '', '#welcome');
        }
    }

    // --- Mobile Menu Logic ---
    function openMobileMenu() {
        sidebar.classList.add('open');
        overlay.classList.add('active');
    }

    function closeMobileMenu() {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', openMobileMenu);
    }

    if (overlay) {
        overlay.addEventListener('click', closeMobileMenu);
    }

    // --- Search Logic ---
    
    // Ctrl + K Shortcut
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            
            sidebarLinks.forEach(link => {
                const text = link.textContent.toLowerCase();
                if (text.includes(query)) {
                    link.style.display = 'flex';
                } else {
                    link.style.display = 'none';
                }
            });

            if (query === '') {
                sidebarLinks.forEach(link => link.style.display = 'flex');
            }
        });
    }

    // --- Terms Accordion ---
    const termHeaders = document.querySelectorAll('.term-header');
    termHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.closest('.term-item');
            if (!item) return;
            const isOpen = item.classList.contains('open');
            item.classList.toggle('open', !isOpen);
        });
    });

    // --- Copy to Clipboard ---
    window.copyToClipboard = function(elementId) {
        const element = document.getElementById(elementId);
        const text = element.textContent;
        
        navigator.clipboard.writeText(text).then(() => {
            const btn = element.parentElement.querySelector('.btn-copy');
            const originalHTML = btn.innerHTML;
            
            btn.innerHTML = '<i class="fas fa-check"></i> Copiado!';
            btn.style.color = '#3ba55c';
            btn.style.borderColor = '#3ba55c';
            
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.color = '';
                btn.style.borderColor = '';
            }, 2000);
        }).catch(err => {
            console.error('Erro ao copiar: ', err);
        });
    };

    // --- Emoji Parser (Placeholder) ---
    function parseEmojis() {
        // Implement emoji parsing if needed
    }
});
