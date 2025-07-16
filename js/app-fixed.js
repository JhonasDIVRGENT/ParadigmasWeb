// Aplicación principal - versión corregida
let app;

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    app = new App();
});

class App {
    constructor() {
        this.model = new Model();
        this.view = new View();
        this.controller = new Controller(this.model, this.view);
        this.init();
    }

    init() {
        this.controller.init();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Navegación suave
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Botón de inicio de sesión
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) {
            loginBtn.addEventListener('click', () => {
                this.controller.handleLogin();
            });
        }

        // Botón de comenzar exploración
        const startBtn = document.getElementById('startBtn');
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                this.controller.handleStartExploration();
            });
        }

        // Scroll navbar effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.classList.add('bg-white/95');
                    navbar.classList.remove('bg-white/90');
                } else {
                    navbar.classList.add('bg-white/90');
                    navbar.classList.remove('bg-white/95');
                }
            }
        });
    }
}

class Model {
    constructor() {
        this.user = null;
        this.currentPage = 'home';
    }

    login(username) {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.user = {
                    username: username,
                    loginTime: new Date(),
                    preferences: {}
                };
                localStorage.setItem('user', JSON.stringify(this.user));
                resolve(this.user);
            }, 1000);
        });
    }

    logout() {
        this.user = null;
        localStorage.removeItem('user');
    }

    checkAuthStatus() {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            this.user = JSON.parse(savedUser);
            return true;
        }
        return false;
    }
}

class View {
    constructor() {
        this.elements = {
            loginBtn: document.getElementById('loginBtn'),
            startBtn: document.getElementById('startBtn'),
            navbar: document.getElementById('navbar'),
            main: document.querySelector('main')
        };
    }

    showLoginModal() {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
                <h2 class="text-2xl handwriting text-blue-900 mb-6 text-center">Iniciar Sesión</h2>
                <form id="loginForm">
                    <div class="mb-4">
                        <label class="block typewriter text-gray-700 mb-2">Nombre de usuario:</label>
                        <input type="text" id="username" class="w-full p-3 border rounded-lg typewriter focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ingresa tu nombre de usuario" required>
                    </div>
                    <div class="flex space-x-4">
                        <button type="submit" class="flex-1 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all duration-300">
                            Entrar
                        </button>
                        <button type="button" id="cancelLogin" class="flex-1 bg-gray-300 text-gray-700 p-3 rounded-lg hover:bg-gray-400 transition-all duration-300">
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        setTimeout(() => {
            const usernameInput = document.getElementById('username');
            if (usernameInput) usernameInput.focus();
        }, 100);
        
        return modal;
    }

    hideModal(modal) {
        if (modal && modal.parentNode) {
            modal.classList.add('opacity-0');
            setTimeout(() => {
                if (modal.parentNode) {
                    document.body.removeChild(modal);
                }
            }, 300);
        }
    }

    updateLoginButton(isLoggedIn, username = '') {
        const loginBtn = this.elements.loginBtn;
        if (loginBtn) {
            if (isLoggedIn) {
                loginBtn.textContent = `Hola, ${username}`;
                loginBtn.classList.add('bg-green-600', 'hover:bg-green-700');
                loginBtn.classList.remove('bg-blue-600', 'hover:bg-blue-700');
            } else {
                loginBtn.textContent = 'Iniciar Sesión';
                loginBtn.classList.add('bg-blue-600', 'hover:bg-blue-700');
                loginBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
            }
        }
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `fixed top-20 right-4 p-4 rounded-lg shadow-lg z-50 transition-all duration-300 transform translate-x-full ${
            type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    renderParadigmsPage() {
        const paradigms = [
            { id: 'structured', name: 'Programación Estructurada', description: 'Paradigma que utiliza estructuras de control bien definidas.', color: 'blue' },
            { id: 'oop', name: 'Programación Orientada a Objetos', description: 'Paradigma basado en objetos que encapsulan datos y comportamientos.', color: 'green' },
            { id: 'functional', name: 'Programación Funcional', description: 'Enfoque basado en funciones matemáticas, evitando cambios de estado.', color: 'purple' },
            { id: 'reactive', name: 'Programación Reactiva', description: 'Paradigma orientado a flujos de datos asincrónicos.', color: 'red' },
            { id: 'procedural', name: 'Programación Procedural', description: 'Paradigma basado en procedimientos y funciones.', color: 'indigo' },
            { id: 'declarative', name: 'Programación Declarativa', description: 'Describe qué se quiere lograr sin especificar cómo.', color: 'pink' },
            { id: 'imperative', name: 'Programación Imperativa', description: 'Describe cómo realizar tareas paso a paso.', color: 'yellow' },
            { id: 'logic', name: 'Programación Lógica', description: 'Basada en lógica formal, usando hechos y reglas.', color: 'teal' },
            { id: 'concurrent', name: 'Programación Concurrente', description: 'Para ejecutar múltiples procesos simultáneamente.', color: 'orange' },
            { id: 'event-driven', name: 'Programación Orientada a Eventos', description: 'El flujo está determinado por eventos externos.', color: 'cyan' }
        ];

        const paradigmsHTML = `
            <div class="container mx-auto px-4 py-8">
                <div class="text-center mb-12">
                    <h1 class="text-5xl handwriting text-blue-900 mb-4">Paradigmas de Programación</h1>
                    <p class="text-xl typewriter text-gray-700 max-w-3xl mx-auto">
                        Explora los diferentes enfoques y filosofías que han moldeado la forma en que escribimos código
                    </p>
                </div>
                
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    ${paradigms.map(paradigm => `
                        <div class="bg-white/80 p-6 rounded-lg shadow-lg card-hover border-l-4 border-${paradigm.color}-500 transform transition-all duration-300 hover:scale-105">
                            <div class="flex items-center mb-4">
                                <div class="w-4 h-4 bg-${paradigm.color}-500 rounded-full mr-3"></div>
                                <h2 class="text-xl handwriting text-${paradigm.color}-800">${paradigm.name}</h2>
                            </div>
                            <p class="typewriter text-gray-700 mb-6 text-sm leading-relaxed">
                                ${paradigm.description}
                            </p>
                            <div class="flex space-x-2">
                                <button class="example-btn bg-${paradigm.color}-600 text-white px-4 py-2 rounded hover:bg-${paradigm.color}-700 transition-all text-sm" data-paradigm="${paradigm.id}">
                                    Ver Ejemplos
                                </button>
                                <button class="detail-btn bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-all text-sm" data-paradigm="${paradigm.id}">
                                    Más Info
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="text-center mt-12">
                    <button id="backToHome" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all">
                        ← Volver al Inicio
                    </button>
                </div>
            </div>
        `;
        
        if (this.elements.main) {
            this.elements.main.innerHTML = paradigmsHTML;
            this.setupParadigmButtons();
        }
    }

    setupParadigmButtons() {
        // Botones de ejemplos
        document.querySelectorAll('.example-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const paradigm = e.target.getAttribute('data-paradigm');
                this.showExamples(paradigm);
            });
        });

        // Botones de detalles
        document.querySelectorAll('.detail-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const paradigm = e.target.getAttribute('data-paradigm');
                this.showDetailPage(paradigm);
            });
        });

        // Botón volver al inicio
        const backBtn = document.getElementById('backToHome');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                this.renderHomePage();
            });
        }
    }

    showExamples(paradigm) {
        console.log('Mostrando ejemplos para:', paradigm);
        
        const examples = window.getExamplesByParadigm ? window.getExamplesByParadigm(paradigm) : {
            title: 'Ejemplos no disponibles',
            description: 'Los ejemplos están cargando...',
            codes: []
        };

        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
        modal.innerHTML = `
            <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div class="p-6 border-b">
                    <div class="flex justify-between items-center">
                        <h2 class="text-3xl handwriting text-blue-900">${examples.title}</h2>
                        <button id="closeExamples" class="text-gray-500 hover:text-gray-700 text-3xl font-bold cursor-pointer">&times;</button>
                    </div>
                </div>
                <div class="p-6">
                    <p class="typewriter text-gray-700 mb-6">${examples.description}</p>
                    <div class="space-y-6">
                        ${examples.codes.map(code => `
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <h3 class="text-xl handwriting text-blue-800 mb-3">${code.title}</h3>
                                <pre class="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto text-sm"><code>${code.code}</code></pre>
                                <p class="typewriter text-gray-600 mt-3">${code.explanation}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Cerrar modal
        const closeBtn = modal.querySelector('#closeExamples');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                if (modal.parentNode) {
                    document.body.removeChild(modal);
                }
            });
        }
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                if (modal.parentNode) {
                    document.body.removeChild(modal);
                }
            }
        });
    }

    showDetailPage(paradigm) {
        console.log('Mostrando detalles para:', paradigm);
        
        const details = window.getDetailsByParadigm ? window.getDetailsByParadigm(paradigm) : {
            title: 'Detalles no disponibles',
            color: 'gray',
            description: 'Los detalles están cargando...',
            characteristics: [],
            advantages: [],
            disadvantages: [],
            languages: [],
            useCases: []
        };

        const detailHTML = `
            <div class="container mx-auto px-4 py-8">
                <div class="max-w-4xl mx-auto">
                    <div class="mb-8">
                        <button id="backToParadigms" class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-all mb-4">
                            ← Volver a Paradigmas
                        </button>
                        <h1 class="text-5xl handwriting text-${details.color}-900 mb-4">${details.title}</h1>
                        <p class="text-xl typewriter text-gray-700 leading-relaxed">${details.description}</p>
                    </div>
                    
                    <div class="space-y-8">
                        <div class="bg-white/80 p-6 rounded-lg shadow-lg">
                            <h2 class="text-3xl handwriting text-${details.color}-800 mb-4">Características Principales</h2>
                            <ul class="typewriter text-gray-700 space-y-2">
                                ${details.characteristics.map(char => `<li class="flex items-start"><span class="text-${details.color}-500 mr-2">•</span>${char}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="bg-white/80 p-6 rounded-lg shadow-lg">
                            <h2 class="text-3xl handwriting text-${details.color}-800 mb-4">Ventajas</h2>
                            <ul class="typewriter text-gray-700 space-y-2">
                                ${details.advantages.map(adv => `<li class="flex items-start"><span class="text-green-500 mr-2">✓</span>${adv}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="bg-white/80 p-6 rounded-lg shadow-lg">
                            <h2 class="text-3xl handwriting text-${details.color}-800 mb-4">Lenguajes Populares</h2>
                            <div class="flex flex-wrap gap-2">
                                ${details.languages.map(lang => `<span class="bg-${details.color}-100 text-${details.color}-800 px-3 py-1 rounded-full text-sm">${lang}</span>`).join('')}
                            </div>
                        </div>
                        
                        <div class="text-center">
                            <button class="example-btn bg-${details.color}-600 text-white px-6 py-3 rounded-lg hover:bg-${details.color}-700 transition-all" data-paradigm="${paradigm}">
                                Ver Ejemplos de Código
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        if (this.elements.main) {
            this.elements.main.innerHTML = detailHTML;
            
            // Setup event listeners
            const backBtn = document.getElementById('backToParadigms');
            if (backBtn) {
                backBtn.addEventListener('click', () => {
                    this.renderParadigmsPage();
                });
            }
            
            const exampleBtn = document.querySelector('.example-btn');
            if (exampleBtn) {
                exampleBtn.addEventListener('click', (e) => {
                    const paradigm = e.target.getAttribute('data-paradigm');
                    this.showExamples(paradigm);
                });
            }
        }
    }

    renderHomePage() {
        const homeHTML = `
            <section id="home" class="container mx-auto px-4 py-16 text-center">
                <div class="max-w-4xl mx-auto">
                    <h1 class="text-6xl handwriting text-blue-900 mb-6 animate-fade-in">
                        Paradigmas de Programación 
                    </h1>
                    <p class="text-xl typewriter text-gray-700 mb-8 leading-relaxed">
                        Explora el fascinante mundo de los diferentes enfoques de programación. 
                        Desde la programación estructurada hasta la reactiva, descubre cómo cada paradigma 
                        moldea la forma en que pensamos y escribimos código.
                    </p>
                    <button id="startBtn" class="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                        Comenzar Exploración
                    </button>
                </div>
            </section>

            <section id="about" class="container mx-auto px-4 py-16">
                <div class="max-w-4xl mx-auto">
                    <h2 class="text-4xl handwriting text-blue-900 mb-8 text-center">Sobre este Blog</h2>
                    <div class="grid md:grid-cols-2 gap-8">
                        <div class="bg-white/70 p-6 rounded-lg shadow-sm">
                            <h3 class="text-2xl handwriting text-blue-800 mb-4">Nuestra Misión</h3>
                            <p class="typewriter text-gray-700 leading-relaxed">
                                Hacer accesible el conocimiento sobre paradigmas de programación a través de 
                                explicaciones claras, ejemplos prácticos y un diseño que inspire el aprendizaje.
                            </p>
                        </div>
                        <div class="bg-white/70 p-6 rounded-lg shadow-sm">
                            <h3 class="text-2xl handwriting text-blue-800 mb-4">¿Qué Encontrarás?</h3>
                            <ul class="typewriter text-gray-700 space-y-2">
                                <li>• Programación Estructurada</li>
                                <li>• Programación Orientada a Objetos</li>
                                <li>• Programación Funcional</li>
                                <li>• Programación Reactiva</li>
                                <li>• Y muchos paradigmas más...</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        `;
        
        if (this.elements.main) {
            this.elements.main.innerHTML = homeHTML;
            
            // Re-setup event listener for start button
            const startBtn = document.getElementById('startBtn');
            if (startBtn) {
                startBtn.addEventListener('click', () => {
                    if (!app.model.user) {
                        app.view.showNotification('Por favor, inicia sesión primero', 'error');
                        app.controller.handleLogin();
                        return;
                    }
                    this.renderParadigmsPage();
                });
            }
        }
    }
}

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    init() {
        if (this.model.checkAuthStatus()) {
            this.view.updateLoginButton(true, this.model.user.username);
        }
    }

    async handleLogin() {
        if (this.model.user) {
            this.model.logout();
            this.view.updateLoginButton(false);
            this.view.showNotification('Sesión cerrada correctamente');
            return;
        }

        const modal = this.view.showLoginModal();
        
        const form = modal.querySelector('#loginForm');
        const cancelBtn = modal.querySelector('#cancelLogin');
        
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const usernameInput = document.getElementById('username');
                const username = usernameInput ? usernameInput.value.trim() : '';
                
                if (username) {
                    try {
                        const user = await this.model.login(username);
                        this.view.updateLoginButton(true, user.username);
                        this.view.hideModal(modal);
                        this.view.showNotification(`¡Bienvenido, ${user.username}!`);
                    } catch (error) {
                        this.view.showNotification('Error al iniciar sesión', 'error');
                    }
                }
            });
        }
        
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                this.view.hideModal(modal);
            });
        }
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.view.hideModal(modal);
            }
        });
    }

    handleStartExploration() {
        if (!this.model.user) {
            this.view.showNotification('Por favor, inicia sesión primero', 'error');
            this.handleLogin();
            return;
        }
        
        this.view.renderParadigmsPage();
        this.view.showNotification('¡Comenzando la exploración!');
    }
}