// Controlador principal de la aplicación (MVC Pattern)
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
        this.setupAnimations();
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
        document.getElementById('loginBtn').addEventListener('click', () => {
            this.controller.handleLogin();
        });

        // Botón de comenzar exploración
        document.getElementById('startBtn').addEventListener('click', () => {
            this.controller.handleStartExploration();
        });

        // Scroll navbar effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('bg-white/95');
                navbar.classList.remove('bg-white/90');
            } else {
                navbar.classList.add('bg-white/90');
                navbar.classList.remove('bg-white/95');
            }
        });
    }

    setupAnimations() {
        // Intersection Observer para animaciones al hacer scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                }
            });
        }, observerOptions);

        // Observar elementos que necesitan animación
        document.querySelectorAll('.card-hover, .bg-white\\/70').forEach(el => {
            observer.observe(el);
        });
    }
}

// Modelo de datos (MVC Pattern)
class Model {
    constructor() {
        this.user = null;
        this.currentPage = 'home';
        this.paradigms = [
            {
                id: 'structured',
                name: 'Programación Estructurada',
                description: 'Enfoque basado en estructuras de control secuenciales, condicionales y repetitivas.',
                color: 'blue',
                examples: []
            },
            {
                id: 'oop',
                name: 'Programación Orientada a Objetos',
                description: 'Paradigma basado en objetos que contienen datos y código.',
                color: 'green',
                examples: []
            },
            {
                id: 'functional',
                name: 'Programación Funcional',
                description: 'Enfoque basado en funciones matemáticas y evita cambiar estados.',
                color: 'purple',
                examples: []
            },
            {
                id: 'reactive',
                name: 'Programación Reactiva',
                description: 'Paradigma orientado a flujos de datos y propagación de cambios.',
                color: 'red',
                examples: []
            },
            {
                id: 'procedural',
                name: 'Programación Procedural',
                description: 'Paradigma basado en procedimientos y funciones que operan sobre datos.',
                color: 'indigo',
                examples: []
            },
            {
                id: 'declarative',
                name: 'Programación Declarativa',
                description: 'Enfoque que describe qué se quiere lograr sin especificar cómo.',
                color: 'pink',
                examples: []
            },
            {
                id: 'imperative',
                name: 'Programación Imperativa',
                description: 'Paradigma que describe cómo realizar tareas paso a paso.',
                color: 'yellow',
                examples: []
            },
            {
                id: 'logic',
                name: 'Programación Lógica',
                description: 'Basada en lógica formal, usando hechos y reglas para resolver problemas.',
                color: 'teal',
                examples: []
            },
            {
                id: 'concurrent',
                name: 'Programación Concurrente',
                description: 'Paradigma para ejecutar múltiples procesos simultáneamente.',
                color: 'orange',
                examples: []
            },
            {
                id: 'event-driven',
                name: 'Programación Orientada a Eventos',
                description: 'Paradigma donde el flujo está determinado por eventos externos.',
                color: 'cyan',
                examples: []
            }
        ];
    }

    // Simular autenticación local
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

    getParadigms() {
        return this.paradigms;
    }

    setCurrentPage(page) {
        this.currentPage = page;
    }

    getCurrentPage() {
        return this.currentPage;
    }
}

// Vista (MVC Pattern)
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
            <div class="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4 paper-effect">
                <h2 class="text-2xl handwriting text-blue-900 mb-6 text-center">Iniciar Sesión</h2>
                <form id="loginForm">
                    <div class="mb-4">
                        <label class="block typewriter text-gray-700 mb-2">Nombre de usuario:</label>
                        <input type="text" id="username" class="w-full p-3 border rounded-lg typewriter focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ingresa tu nombre de usuario" required>
                    </div>
                    <div class="flex space-x-4">
                        <button type="submit" class="flex-1 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all duration-300 btn-typewriter">
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

        // Focus en el input
        setTimeout(() => {
            document.getElementById('username').focus();
        }, 100);

        return modal;
    }

    hideModal(modal) {
        modal.classList.add('opacity-0');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }

    showLoading(element) {
        element.classList.add('loading');
        element.disabled = true;
    }

    hideLoading(element) {
        element.classList.remove('loading');
        element.disabled = false;
    }

    updateLoginButton(isLoggedIn, username = '') {
        if (isLoggedIn) {
            this.elements.loginBtn.textContent = `Hola, ${username}`;
            this.elements.loginBtn.classList.add('bg-green-600', 'hover:bg-green-700');
            this.elements.loginBtn.classList.remove('bg-blue-600', 'hover:bg-blue-700');
        } else {
            this.elements.loginBtn.textContent = 'Iniciar Sesión';
            this.elements.loginBtn.classList.add('bg-blue-600', 'hover:bg-blue-700');
            this.elements.loginBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
        }
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `fixed top-20 right-4 p-4 rounded-lg shadow-lg z-50 transition-all duration-300 transform translate-x-full ${type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
            }`;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);

        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    renderParadigmsPage() {
        const paradigms = [
            {
                id: 'structured',
                name: 'Programación Estructurada',
                description: 'Paradigma que utiliza estructuras de control bien definidas como secuencias, selecciones e iteraciones.',
                color: 'blue'
            },
            {
                id: 'oop',
                name: 'Programación Orientada a Objetos',
                description: 'Paradigma basado en objetos que encapsulan datos y comportamientos, promoviendo la reutilización del código.',
                color: 'green'
            },
            {
                id: 'functional',
                name: 'Programación Funcional',
                description: 'Enfoque que trata la computación como evaluación de funciones matemáticas, evitando cambios de estado.',
                color: 'purple'
            },
            {
                id: 'reactive',
                name: 'Programación Reactiva',
                description: 'Paradigma orientado a flujos de datos asincrónicos y la propagación automática de cambios.',
                color: 'red'
            },
            {
                id: 'procedural',
                name: 'Programación Procedural',
                description: 'Paradigma basado en procedimientos y funciones que operan sobre datos de manera secuencial.',
                color: 'indigo'
            },
            {
                id: 'declarative',
                name: 'Programación Declarativa',
                description: 'Enfoque que describe qué se quiere lograr sin especificar cómo hacerlo paso a paso.',
                color: 'pink'
            },
            {
                id: 'imperative',
                name: 'Programación Imperativa',
                description: 'Paradigma que describe cómo realizar tareas paso a paso mediante instrucciones explícitas.',
                color: 'yellow'
            },
            {
                id: 'logic',
                name: 'Programación Lógica',
                description: 'Basada en lógica formal, usando hechos y reglas para resolver problemas mediante inferencia.',
                color: 'teal'
            },
            {
                id: 'concurrent',
                name: 'Programación Concurrente',
                description: 'Paradigma para ejecutar múltiples procesos simultáneamente y coordinar su interacción.',
                color: 'orange'
            },
            {
                id: 'event-driven',
                name: 'Programación Orientada a Eventos',
                description: 'Paradigma donde el flujo del programa está determinado por eventos externos como clics o mensajes.',
                color: 'cyan'
            }
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
                                <h2 class="text-2xl handwriting text-${paradigm.color}-800">${paradigm.name}</h2>
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

        this.elements.main.innerHTML = paradigmsHTML;
        this.elements.main.classList.add('page-transition');

        // Agregar event listeners
        this.setupExampleButtons();
        this.setupDetailButtons();
        this.setupBackButton();
    }

    setupExampleButtons() {
        const exampleButtons = document.querySelectorAll('.example-btn');
        exampleButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const paradigm = e.target.getAttribute('data-paradigm');
                this.showExamples(paradigm);
            });
        });
    }

    setupDetailButtons() {
        const detailButtons = document.querySelectorAll('.detail-btn');
        detailButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const paradigm = e.target.getAttribute('data-paradigm');
                this.showDetailPage(paradigm);
            });
        });
    }

    setupBackButton() {
        const backBtn = document.getElementById('backToHome');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                this.renderHomePage();
            });
        }
    }

    renderHomePage() {
        const homeHTML = `
            <!-- Hero Section -->
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

            <!-- About Section -->
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

        this.elements.main.innerHTML = homeHTML;

        // Re-setup event listener for start button
        const startBtn = document.getElementById('startBtn');
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                if (!window.app.model.user) {
                    window.app.view.showNotification('Por favor, inicia sesión primero', 'error');
                    window.app.controller.handleLogin();
                    return;
                }
                this.renderParadigmsPage();
            });
        }
    }

    showDetailPage(paradigm) {
        const details = this.getDetailsByParadigm(paradigm);
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
                            <h2 class="text-3xl handwriting text-${details.color}-800 mb-4">Desventajas</h2>
                            <ul class="typewriter text-gray-700 space-y-2">
                                ${details.disadvantages.map(dis => `<li class="flex items-start"><span class="text-red-500 mr-2">✗</span>${dis}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="bg-white/80 p-6 rounded-lg shadow-lg">
                            <h2 class="text-3xl handwriting text-${details.color}-800 mb-4">Lenguajes Populares</h2>
                            <div class="flex flex-wrap gap-2">
                                ${details.languages.map(lang => `<span class="bg-${details.color}-100 text-${details.color}-800 px-3 py-1 rounded-full text-sm">${lang}</span>`).join('')}
                            </div>
                        </div>
                        
                        <div class="bg-white/80 p-6 rounded-lg shadow-lg">
                            <h2 class="text-3xl handwriting text-${details.color}-800 mb-4">Casos de Uso</h2>
                            <ul class="typewriter text-gray-700 space-y-2">
                                ${details.useCases.map(use => `<li class="flex items-start"><span class="text-${details.color}-500 mr-2">→</span>${use}</li>`).join('')}
                            </ul>
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

    showExamples(paradigm) {
        const examples = this.getExamplesByParadigm(paradigm);
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
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    getDetailsByParadigm(paradigm) {
        return window.getDetailsByParadigm(paradigm);
    }

    getExamplesByParadigm(paradigm) {
        return window.getExamplesByParadigm(paradigm);
    }

    getExamplesByParadigm(paradigm) {
        const examples = {
            structured: {
                title: 'Programación Estructurada - Ejemplos',
                description: 'La programación estructurada utiliza estructuras de control claras y evita el uso de GOTO.',
                codes: [
                    {
                        title: 'Ejemplo en C - Cálculo de Factorial',
                        code: `#include <stdio.h>

int factorial(int n) {
    int resultado = 1;
    
    // Estructura de control: bucle for
    for (int i = 1; i <= n; i++) {
        resultado *= i;
    }
    
    return resultado;
}

int main() {
    int numero = 5;
    
    // Estructura de control: condicional
    if (numero >= 0) {
        printf("Factorial de %d es %d\\n", 
               numero, factorial(numero));
    } else {
        printf("Error: número negativo\\n");
    }
    
    return 0;
}`,
                        explanation: 'Este ejemplo muestra el uso de estructuras de control básicas: secuencia, selección (if) e iteración (for).'
                    },
                    {
                        title: 'Ejemplo en Python - Búsqueda en Array',
                        code: `def buscar_elemento(lista, elemento):
    """Busca un elemento en una lista usando programación estructurada"""
    
    # Estructura secuencial
    encontrado = False
    posicion = -1
    
    # Estructura iterativa
    for i in range(len(lista)):
        # Estructura condicional
        if lista[i] == elemento:
            encontrado = True
            posicion = i
            break  # Control de flujo estructurado
    
    return encontrado, posicion

# Programa principal
numeros = [10, 25, 30, 45, 50]
buscar = 30

encontrado, pos = buscar_elemento(numeros, buscar)

if encontrado:
    print(f"Elemento {buscar} encontrado en posición {pos}")
else:
    print(f"Elemento {buscar} no encontrado")`,
                        explanation: 'Demuestra cómo la programación estructurada organiza el código en bloques lógicos con control de flujo claro.'
                    }
                ]
            },
            oop: {
                title: 'Programación Orientada a Objetos - Ejemplos',
                description: 'La POO organiza el código en objetos que encapsulan datos y comportamientos.',
                codes: [
                    {
                        title: 'Ejemplo en Java - Clase Vehículo',
                        code: `// Clase base (Herencia)
public class Vehiculo {
    // Encapsulación - atributos privados
    private String marca;
    private String modelo;
    private int año;
    
    // Constructor
    public Vehiculo(String marca, String modelo, int año) {
        this.marca = marca;
        this.modelo = modelo;
        this.año = año;
    }
    
    // Métodos públicos (interfaz)
    public void acelerar() {
        System.out.println("El vehículo está acelerando");
    }
    
    public void frenar() {
        System.out.println("El vehículo está frenando");
    }
    
    // Getters y Setters
    public String getMarca() { return marca; }
    public String getModelo() { return modelo; }
}

// Herencia - clase derivada
public class Coche extends Vehiculo {
    private int numeroPuertas;
    
    public Coche(String marca, String modelo, int año, int puertas) {
        super(marca, modelo, año);  // Llamada al constructor padre
        this.numeroPuertas = puertas;
    }
    
    // Polimorfismo - sobrescribir método
    @Override
    public void acelerar() {
        System.out.println("El coche acelera suavemente");
    }
    
    public void abrirPuertas() {
        System.out.println("Abriendo " + numeroPuertas + " puertas");
    }
}`,
                        explanation: 'Muestra los pilares de la POO: encapsulación, herencia y polimorfismo en una jerarquía de clases.'
                    },
                    {
                        title: 'Ejemplo en Python - Sistema de Empleados',
                        code: `class Empleado:
    """Clase base para empleados"""
    
    def __init__(self, nombre, salario_base):
        self._nombre = nombre  # Atributo protegido
        self._salario_base = salario_base
    
    def calcular_salario(self):
        """Método que será sobrescrito (polimorfismo)"""
        return self._salario_base
    
    def mostrar_info(self):
        return f"Empleado: {self._nombre}, Salario: ${self.calcular_salario()}"

class Desarrollador(Empleado):
    """Herencia - Desarrollador es un tipo de Empleado"""
    
    def __init__(self, nombre, salario_base, lenguajes):
        super().__init__(nombre, salario_base)
        self.lenguajes = lenguajes
    
    def calcular_salario(self):
        """Polimorfismo - implementación específica"""
        bonus = len(self.lenguajes) * 500
        return self._salario_base + bonus

class Gerente(Empleado):
    """Otra clase derivada"""
    
    def __init__(self, nombre, salario_base, equipo_size):
        super().__init__(nombre, salario_base)
        self.equipo_size = equipo_size
    
    def calcular_salario(self):
        """Polimorfismo - otra implementación"""
        bonus = self.equipo_size * 1000
        return self._salario_base + bonus

# Uso del sistema
empleados = [
    Desarrollador("Ana", 50000, ["Python", "JavaScript", "Java"]),
    Gerente("Carlos", 60000, 5),
    Desarrollador("Luis", 45000, ["C++", "Python"])
]

for emp in empleados:
    print(emp.mostrar_info())`,
                        explanation: 'Ejemplo práctico que demuestra herencia, polimorfismo y encapsulación en un sistema de gestión de empleados.'
                    }
                ]
            },
            functional: {
                title: 'Programación Funcional - Ejemplos',
                description: 'La programación funcional se basa en funciones puras, inmutabilidad y composición de funciones.',
                codes: [
                    {
                        title: 'Ejemplo en JavaScript - Funciones Puras',
                        code: `// Función pura - mismo input, mismo output, sin efectos secundarios
const sumar = (a, b) => a + b;

// Función de orden superior
const aplicarOperacion = (lista, operacion) => 
    lista.map(operacion);

// Composición de funciones
const componer = (f, g) => (x) => f(g(x));

// Funciones puras para transformaciones
const duplicar = x => x * 2;
const incrementar = x => x + 1;
const esPar = x => x % 2 === 0;

// Datos inmutables
const numeros = [1, 2, 3, 4, 5];

// Transformaciones funcionales
const numerosDuplicados = numeros.map(duplicar);
const numerosIncrementados = numeros.map(incrementar);
const numerosPares = numeros.filter(esPar);

// Composición de funciones
const duplicarYIncrementar = componer(incrementar, duplicar);
const resultado = numeros.map(duplicarYIncrementar);

console.log("Original:", numeros);
console.log("Duplicados:", numerosDuplicados);
console.log("Incrementados:", numerosIncrementados);
console.log("Pares:", numerosPares);
console.log("Duplicar y incrementar:", resultado);

// Reducción funcional
const suma = numeros.reduce(sumar, 0);
console.log("Suma total:", suma);`,
                        explanation: 'Demuestra funciones puras, inmutabilidad, funciones de orden superior y composición funcional.'
                    },
                    {
                        title: 'Ejemplo en Haskell - Recursión y Listas',
                        code: `-- Función recursiva pura para calcular factorial
factorial :: Integer -> Integer
factorial 0 = 1
factorial n = n * factorial (n - 1)

-- Función recursiva para suma de lista
sumaLista :: [Integer] -> Integer
sumaLista [] = 0
sumaLista (x:xs) = x + sumaLista xs

-- Función de orden superior personalizada
mapear :: (a -> b) -> [a] -> [b]
mapear _ [] = []
mapear f (x:xs) = f x : mapear f xs

-- Función para filtrar elementos
filtrar :: (a -> Bool) -> [a] -> [a]
filtrar _ [] = []
filtrar p (x:xs)
    | p x = x : filtrar p xs
    | otherwise = filtrar p xs

-- Composición de funciones
cuadrado :: Integer -> Integer
cuadrado x = x * x

esPar :: Integer -> Bool
esPar x = x \`mod\` 2 == 0

-- Uso de las funciones
numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

-- Aplicar transformaciones
cuadrados = mapear cuadrado numeros
pares = filtrar esPar numeros
cuadradosPares = mapear cuadrado (filtrar esPar numeros)

-- Ejemplo de uso:
-- factorial 5 = 120
-- sumaLista [1,2,3,4,5] = 15
-- cuadrados = [1,4,9,16,25,36,49,64,81,100]
-- pares = [2,4,6,8,10]
-- cuadradosPares = [4,16,36,64,100]`,
                        explanation: 'Ejemplo en Haskell que muestra recursión, pattern matching, funciones de orden superior y composición funcional pura.'
                    }
                ]
            },
            reactive: {
                title: 'Programación Reactiva - Ejemplos',
                description: 'La programación reactiva maneja flujos de datos asincrónicos y propagación automática de cambios.',
                codes: [
                    {
                        title: 'Ejemplo con RxJS - Observables',
                        code: `import { Observable, fromEvent, map, filter, debounceTime } from 'rxjs';

// Crear un Observable desde eventos del DOM
const inputElement = document.getElementById('searchInput');
const searchStream = fromEvent(inputElement, 'input');

// Transformar el stream de eventos
const searchQuery = searchStream.pipe(
    map(event => event.target.value),        // Extraer el valor
    filter(text => text.length > 2),         // Filtrar textos cortos
    debounceTime(300)                        // Esperar 300ms sin cambios
);

// Suscribirse al stream
searchQuery.subscribe(query => {
    console.log('Buscando:', query);
    // Aquí haríamos la búsqueda real
    performSearch(query);
});

// Ejemplo de Observable personalizado
const mouseMovements = new Observable(observer => {
    const handler = event => {
        observer.next({
            x: event.clientX,
            y: event.clientY,
            timestamp: Date.now()
        });
    };
    
    document.addEventListener('mousemove', handler);
    
    // Función de limpieza
    return () => {
        document.removeEventListener('mousemove', handler);
    };
});

// Transformar movimientos del mouse
const throttledMovements = mouseMovements.pipe(
    filter(pos => pos.x > 100),              // Solo movimientos a la derecha
    map(pos => ({ ...pos, quadrant: getQuadrant(pos) }))
);

throttledMovements.subscribe(pos => {
    console.log(\`Mouse en cuadrante \${pos.quadrant}\`);
});

function performSearch(query) {
    // Simular búsqueda asíncrona
    return fetch(\`/api/search?q=\${query}\`)
        .then(response => response.json())
        .then(results => {
            console.log('Resultados:', results);
        });
}

function getQuadrant(pos) {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    if (pos.x > centerX && pos.y < centerY) return 'I';
    if (pos.x < centerX && pos.y < centerY) return 'II';
    if (pos.x < centerX && pos.y > centerY) return 'III';
    return 'IV';
}`,
                        explanation: 'Muestra cómo RxJS maneja streams de eventos, transformaciones reactivas y suscripciones a flujos de datos.'
                    },
                    {
                        title: 'Ejemplo en Java - Reactive Streams',
                        code: `import java.util.concurrent.Flow.*;
import java.util.concurrent.SubmissionPublisher;
import java.util.List;
import java.util.concurrent.TimeUnit;

// Publisher personalizado para temperaturas
class TemperatureSensor extends SubmissionPublisher<Double> {
    private volatile boolean active = true;
    
    public void startSensing() {
        // Simular lecturas de temperatura cada segundo
        new Thread(() -> {
            double baseTemp = 20.0;
            while (active) {
                double temperature = baseTemp + (Math.random() * 10 - 5);
                submit(temperature);
                
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    break;
                }
            }
        }).start();
    }
    
    public void stop() {
        active = false;
        close();
    }
}

// Processor para filtrar temperaturas altas
class HighTemperatureProcessor implements Processor<Double, String> {
    private Subscriber<? super String> subscriber;
    private Subscription subscription;
    
    @Override
    public void subscribe(Subscriber<? super String> subscriber) {
        this.subscriber = subscriber;
        subscriber.onSubscribe(new Subscription() {
            @Override
            public void request(long n) {
                subscription.request(n);
            }
            
            @Override
            public void cancel() {
                subscription.cancel();
            }
        });
    }
    
    @Override
    public void onSubscribe(Subscription subscription) {
        this.subscription = subscription;
        subscription.request(1);
    }
    
    @Override
    public void onNext(Double temperature) {
        if (temperature > 25.0) {
            subscriber.onNext("¡ALERTA! Temperatura alta: " + temperature + "°C");
        }
        subscription.request(1);
    }
    
    @Override
    public void onError(Throwable throwable) {
        subscriber.onError(throwable);
    }
    
    @Override
    public void onComplete() {
        subscriber.onComplete();
    }
}

// Subscriber para manejar alertas
class AlertSubscriber implements Subscriber<String> {
    private Subscription subscription;
    
    @Override
    public void onSubscribe(Subscription subscription) {
        this.subscription = subscription;
        subscription.request(Long.MAX_VALUE);
    }
    
    @Override
    public void onNext(String alert) {
        System.out.println("SISTEMA DE ALERTAS: " + alert);
        // Aquí se podría enviar notificación, email, etc.
    }
    
    @Override
    public void onError(Throwable throwable) {
        System.err.println("Error en alertas: " + throwable.getMessage());
    }
    
    @Override
    public void onComplete() {
        System.out.println("Sistema de alertas desconectado");
    }
}

// Uso del sistema reactivo
public class ReactiveTemperatureSystem {
    public static void main(String[] args) throws InterruptedException {
        TemperatureSensor sensor = new TemperatureSensor();
        HighTemperatureProcessor processor = new HighTemperatureProcessor();
        AlertSubscriber alertSystem = new AlertSubscriber();
        
        // Conectar el pipeline reactivo
        sensor.subscribe(processor);
        processor.subscribe(alertSystem);
        
        // Iniciar el sistema
        sensor.startSensing();
        
        // Ejecutar por 10 segundos
        Thread.sleep(10000);
        
        // Detener el sistema
        sensor.stop();
    }
}`,
                        explanation: 'Ejemplo de Reactive Streams en Java mostrando Publisher, Processor y Subscriber trabajando en un sistema de monitoreo de temperatura.'
                    }
                ]
            }
        };

        return examples[paradigm] || { title: 'Paradigma no encontrado', description: '', codes: [] };
    }
}

// Controlador (MVC Pattern)
class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    init() {
        // Verificar estado de autenticación al iniciar
        if (this.model.checkAuthStatus()) {
            this.view.updateLoginButton(true, this.model.user.username);
        }
    }

    async handleLogin() {
        if (this.model.user) {
            // Si ya está logueado, hacer logout
            this.model.logout();
            this.view.updateLoginButton(false);
            this.view.showNotification('Sesión cerrada correctamente');
            return;
        }

        const modal = this.view.showLoginModal();

        const form = modal.querySelector('#loginForm');
        const cancelBtn = modal.querySelector('#cancelLogin');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value.trim();

            if (username) {
                const submitBtn = form.querySelector('button[type="submit"]');
                this.view.showLoading(submitBtn);

                try {
                    const user = await this.model.login(username);
                    this.view.updateLoginButton(true, user.username);
                    this.view.hideModal(modal);
                    this.view.showNotification(`¡Bienvenido, ${user.username}!`);
                } catch (error) {
                    this.view.showNotification('Error al iniciar sesión', 'error');
                } finally {
                    this.view.hideLoading(submitBtn);
                }
            }
        });

        cancelBtn.addEventListener('click', () => {
            this.view.hideModal(modal);
        });

        // Cerrar modal al hacer clic fuera
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

        this.model.setCurrentPage('paradigms');
        this.view.renderParadigmsPage();
        this.view.showNotification('¡Comenzando la exploración!');
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new App();
});