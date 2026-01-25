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

    let currentSectionId = 'welcome';
    let aboutHasTyped = false;
    const aboutElement = document.getElementById('about-typewriter');
    const aboutFullText = "✨ Mystic Buuixx ✨\n\nA Mystic Buuixx surgiu oficialmente em 2026, porém sua criação teve início no final de 2025 🕰️. O fundador e proprietário é conhecido como Sr. Sonho 👑, cujo nome real é Davi. No entanto, opto por ser reconhecido como Sr. Sonho, pois “Davi” é um nome reservado para família e amigos 👨‍👩‍👦.\n\nA Mystic Buuixx foi inspirada em duas lojas já existentes: Eclipse 🌘 e Cerry 🍒. A proposta nunca foi copiar ou competir, mas sim criar algo semelhante, porém muito mais evoluído, moderno e automatizado ⚙️🚀.\nNosso objetivo é oferecer uma experiência completa, contando com sistemas avançados, sites 🌐, wikis 📚, além da realização frequente de sorteios 🎁 e torneios 🏆.\n\nA equipe é devidamente remunerada 💰, e deixo claro que não digo isso por vanglória, nem para afirmar que a Mystic é ou será superior a qualquer outra loja. Pelo contrário, não desejo conflitos com nenhuma delas 🤝. Respeito todas e espero ser respeitado da mesma forma. Inclusive, há interesse em parcerias futuras, especialmente com a Cerry, envolvendo Robux 💎 e outros projetos.\n\nA loja não será limitada apenas à venda de Robux 💎. Também trabalharemos com contas de jogos 🎮, itens in-game 🧩 e diversos outros serviços. Tenho grande admiração pela loja Cerry, interajo bastante com ela e recomendo que todos deem uma olhada 👀.\n\n📅 O desenvolvimento da loja começou no dia 23 de dezembro, inicialmente apenas comigo 👤. Houve a ajuda pontual de um amigo na organização de permissões de canais, porém, por não contar com amigos na área de programação 💻, todo o restante do projeto foi desenvolvido de forma independente 💪.\n\n🚪 A abertura oficial da loja está prevista para o dia 10 de fevereiro de 2026 🎉.\n\n💖 Comprometo-me que, caso a loja cresça, conquiste muitos membros 👥, clientes 🧑‍💼 e tenha uma comunidade ativa 💬, sempre haverá descontos mensais 🏷️. Em datas comemorativas 🎊, esses descontos serão ainda mais expressivos 🔥.\nPrezo muito pelos membros e, por isso, dou prioridade à realização de torneios 🏆, pois eles valorizam habilidade, esforço e trabalho em equipe 🤜🤛. Ainda assim, sorteios 🎁 também acontecerão, porém os torneios terão maior destaque dentro da loja.\n\n📺 Também está previsto o lançamento de um canal oficial da Mystic Buuixx no YouTube, onde um criador será desenvolvido 🌟. Eu serei o proprietário do canal 👑, mas não atuarei como editor nem como apresentador 🎥.\nO YouTuber será escolhido com muito cuidado ✋ e deverá cumprir os seguintes requisitos:\n\n🔞 Idade mínima: 17 anos\n\n📜 Assinatura de um contrato com duração de 1 ano\n\n🎯 Cumprimento de metas estabelecidas pela loja\n\n💼 Durante o contrato, 70% dos lucros serão destinados à loja. Essa divisão existe porque todos os custos de produção — como edição ✂️, Robux 💎, itens em jogos 🎮 e demais recursos — serão totalmente patrocinados pela Mystic Buuixx 🤝.\n\n⚠️ Caso o criador não atinja as metas estabelecidas, o contrato será encerrado, e a loja buscará outro YouTuber para ocupar a posição 🔍. Ao final do contrato de 1 ano, caso ambas as partes estejam satisfeitas, ele poderá ser renovado 📈.\n\n🔐 O canal utilizará uma conta exclusiva da loja, garantindo que todo o patrocínio e crescimento estejam vinculados à Mystic Buuixx 🏦. Futuramente, dependendo dos resultados, essa decisão poderá ser reavaliada 🔮.\n\n💵 Os editores da Mystic e o YouTuber receberão pagamento em dinheiro, e eventuais placas de inscritos 🏅 pertencerão à loja, ficando expostas na futura loja física da Mystic 🏢. Caso o criador deseje desenvolver um canal pessoal, também poderei oferecer apoio e divulgação 📢, desde que haja retorno, seja por divulgação da loja ou por uma porcentagem dos ganhos.\n\n💳 Por fim, a Mystic Buuixx contará com diversos métodos de pagamento, além de uma equipe de entregadores 🚚 organizada em turnos ⏰. Caso alguém não possa cumprir um turno específico, será analisada a possibilidade de troca com outro membro da equipe 🔄, garantindo sempre o bom funcionamento do serviço ✅.\n\n✨ Bom, essa é uma geral do que está previsto para o futuro e do que já rolou no passado da loja. Muito obrigado por ler, e lembre-se: a loja sempre estará disponível para vocês. ✨";

    function startAboutTypewriter() {
        if (!aboutElement || aboutHasTyped) return;
        const totalChars = aboutFullText.length;
        if (totalChars === 0) return;
        const duration = 10000;
        const step = duration / totalChars;
        let index = 0;
        aboutHasTyped = true;

        function tick() {
            index += 1;
            if (index > totalChars) {
                index = totalChars;
            }
            const partial = aboutFullText.slice(0, index);
            aboutElement.textContent = partial;
            if (index < totalChars) {
                setTimeout(tick, step);
            }
        }

        tick();
    }

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

        if (section.id === 'about') {
            startAboutTypewriter();
        }
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

    const youtubeCard = document.querySelector('.youtube-card[data-channel-url]');
    if (youtubeCard) {
        const channelUrl = youtubeCard.getAttribute('data-channel-url');
        const avatarEl = youtubeCard.querySelector('.youtube-avatar');
        const nameEl = youtubeCard.querySelector('.youtube-name');
        const metaEl = youtubeCard.querySelector('.youtube-meta');

        fetch(`/api/youtube/channel-info?url=${encodeURIComponent(channelUrl)}`)
            .then(response => {
                if (!response.ok) return null;
                return response.json();
            })
            .then(data => {
                if (!data) return;

                if (nameEl && data.title) {
                    nameEl.textContent = data.title;
                }

                if (avatarEl && data.thumbnailUrl) {
                    avatarEl.style.backgroundImage = `url("${data.thumbnailUrl}")`;
                    avatarEl.style.backgroundSize = 'cover';
                    avatarEl.style.backgroundPosition = 'center';
                    avatarEl.style.backgroundColor = 'transparent';
                    avatarEl.textContent = '';
                }

                if (metaEl) {
                    if (typeof data.subscriberCount === 'number' && typeof data.viewCount === 'number') {
                        const subscribers = data.subscriberCount.toLocaleString('pt-BR');
                        const views = data.viewCount.toLocaleString('pt-BR');
                        metaEl.textContent = `${subscribers} inscritos • ${views} visualizações`;
                    } else if (data.subscriberCount === null && data.viewCount === null) {
                        metaEl.textContent = 'Canal oficial no YouTube';
                    }
                }
            })
            .catch(() => {});
    }

    // --- Emoji Parser (Placeholder) ---
    function parseEmojis() {
    }

    const partnerCard = document.querySelector('.partner-card[data-invite]');
    if (partnerCard) {
        const invite = partnerCard.getAttribute('data-invite');
        const logoEl = partnerCard.querySelector('.partner-logo');
        const nameEl = partnerCard.querySelector('.partner-name');
        const descEl = partnerCard.querySelector('.partner-desc');
        const metaEl = partnerCard.querySelector('.partner-meta');

        fetch(`/api/partner/invite-info?invite=${encodeURIComponent(invite)}`)
            .then(response => {
                if (!response.ok) return null;
                return response.json();
            })
            .then(data => {
                if (!data) return;

                if (nameEl && data.name) {
                    nameEl.textContent = data.name;
                }

                if (descEl && data.description) {
                    descEl.textContent = data.description;
                }

                if (metaEl && typeof data.members === 'number') {
                    metaEl.textContent = `Quantidade de membros: ${data.members}`;
                }

                if (logoEl && data.iconUrl) {
                    logoEl.style.backgroundImage = `url("${data.iconUrl}")`;
                    logoEl.style.backgroundSize = 'cover';
                    logoEl.style.backgroundPosition = 'center';
                    logoEl.textContent = '';
                }

                if (data.invite) {
                    partnerCard.href = data.invite;
                }
            })
            .catch(() => {});
    }
});
