// Detalles completos de cada paradigma de programación
function getDetailsByParadigm(paradigm) {
    const details = {
        structured: {
            title: 'Programación Estructurada',
            color: 'blue',
            description: 'La programación estructurada es un paradigma que enfatiza el uso de estructuras de control bien definidas y evita el uso de instrucciones de salto como GOTO.',
            characteristics: [
                'Uso de estructuras de control: secuencia, selección e iteración',
                'Evita el uso de GOTO y saltos incondicionales',
                'Código organizado en bloques lógicos',
                'Facilita la lectura y mantenimiento del código',
                'Promueve la programación top-down'
            ],
            advantages: [
                'Código más legible y mantenible',
                'Facilita la depuración y testing',
                'Reduce la complejidad del programa',
                'Mejora la productividad del programador',
                'Facilita el trabajo en equipo'
            ],
            disadvantages: [
                'Puede ser restrictivo para ciertos problemas',
                'No siempre es la solución más eficiente',
                'Limitado para programas muy complejos',
                'Puede generar código repetitivo'
            ],
            languages: ['C', 'Pascal', 'COBOL', 'FORTRAN', 'ALGOL'],
            useCases: [
                'Sistemas embebidos',
                'Programas de control industrial',
                'Algoritmos matemáticos',
                'Sistemas operativos básicos',
                'Aplicaciones de procesamiento de datos'
            ]
        },
        oop: {
            title: 'Programación Orientada a Objetos',
            color: 'green',
            description: 'Paradigma basado en objetos que encapsulan datos (atributos) y código (métodos), promoviendo la reutilización y modularidad.',
            characteristics: [
                'Encapsulación: agrupa datos y métodos',
                'Herencia: permite crear clases derivadas',
                'Polimorfismo: mismo método, diferentes comportamientos',
                'Abstracción: oculta detalles de implementación',
                'Composición y agregación de objetos'
            ],
            advantages: [
                'Reutilización de código mediante herencia',
                'Modularidad y organización clara',
                'Facilita el mantenimiento y escalabilidad',
                'Modelado natural de problemas del mundo real',
                'Facilita el trabajo colaborativo'
            ],
            disadvantages: [
                'Curva de aprendizaje más pronunciada',
                'Puede ser excesivo para problemas simples',
                'Overhead de memoria y procesamiento',
                'Complejidad en jerarquías profundas'
            ],
            languages: ['Java', 'C++', 'C#', 'Python', 'Ruby', 'Kotlin', 'Swift'],
            useCases: [
                'Aplicaciones empresariales',
                'Desarrollo de videojuegos',
                'Interfaces gráficas de usuario',
                'Sistemas de gestión',
                'Aplicaciones web y móviles'
            ]
        },
        functional: {
            title: 'Programación Funcional',
            color: 'purple',
            description: 'Paradigma que trata la computación como evaluación de funciones matemáticas, evitando cambios de estado y datos mutables.',
            characteristics: [
                'Funciones como ciudadanos de primera clase',
                'Inmutabilidad de datos',
                'Funciones puras sin efectos secundarios',
                'Recursión en lugar de iteración',
                'Composición y transformación de funciones'
            ],
            advantages: [
                'Código más predecible y testeable',
                'Facilita la paralelización',
                'Menos errores relacionados con estado',
                'Expresividad y concisión',
                'Facilita el razonamiento matemático'
            ],
            disadvantages: [
                'Curva de aprendizaje empinada',
                'Puede ser menos eficiente en memoria',
                'Difícil para modelar algunos problemas',
                'Debugging más complejo'
            ],
            languages: ['Haskell', 'Lisp', 'Clojure', 'F#', 'Erlang', 'Scala', 'JavaScript (parcial)'],
            useCases: [
                'Procesamiento de datos masivos',
                'Sistemas concurrentes y distribuidos',
                'Análisis financiero y científico',
                'Compiladores e intérpretes',
                'Inteligencia artificial'
            ]
        },
        reactive: {
            title: 'Programación Reactiva',
            color: 'red',
            description: 'Paradigma orientado a flujos de datos asincrónicos y la propagación automática de cambios a través del sistema.',
            characteristics: [
                'Streams de datos asincrónicos',
                'Propagación automática de cambios',
                'Composición de operadores',
                'Manejo declarativo de eventos',
                'Backpressure y control de flujo'
            ],
            advantages: [
                'Excelente para aplicaciones en tiempo real',
                'Manejo elegante de asincronía',
                'Composición declarativa de operaciones',
                'Escalabilidad y rendimiento',
                'Separación clara de concerns'
            ],
            disadvantages: [
                'Complejidad conceptual alta',
                'Debugging complejo',
                'Curva de aprendizaje pronunciada',
                'Overhead para casos simples'
            ],
            languages: ['RxJS', 'RxJava', 'Reactor', 'Akka Streams', 'ReactiveX'],
            useCases: [
                'Interfaces de usuario reactivas',
                'Sistemas de trading en tiempo real',
                'IoT y sensores',
                'Streaming de datos',
                'Aplicaciones web modernas'
            ]
        },
        procedural: {
            title: 'Programación Procedural',
            color: 'indigo',
            description: 'Paradigma basado en procedimientos o funciones que operan sobre datos, organizando el código en rutinas reutilizables.',
            characteristics: [
                'Organización en procedimientos/funciones',
                'Datos y funciones separados',
                'Llamadas a procedimientos secuenciales',
                'Variables globales y locales',
                'Modularización mediante funciones'
            ],
            advantages: [
                'Simplicidad conceptual',
                'Reutilización de código mediante funciones',
                'Fácil de entender y aprender',
                'Eficiente para problemas algorítmicos',
                'Debugging relativamente simple'
            ],
            disadvantages: [
                'Dificultad para manejar complejidad',
                'Problemas con variables globales',
                'Menos modular que OOP',
                'Difícil mantenimiento en proyectos grandes'
            ],
            languages: ['C', 'Pascal', 'FORTRAN', 'COBOL', 'Go'],
            useCases: [
                'Sistemas embebidos',
                'Algoritmos matemáticos',
                'Herramientas de línea de comandos',
                'Sistemas operativos',
                'Procesamiento de datos científicos'
            ]
        },
        declarative: {
            title: 'Programación Declarativa',
            color: 'pink',
            description: 'Enfoque que describe qué se quiere lograr sin especificar cómo hacerlo, dejando los detalles de implementación al sistema.',
            characteristics: [
                'Describe el "qué" no el "cómo"',
                'Alto nivel de abstracción',
                'Menos control sobre la ejecución',
                'Expresividad y concisión',
                'Separación de lógica y control'
            ],
            advantages: [
                'Código más expresivo y legible',
                'Menos propenso a errores',
                'Facilita el mantenimiento',
                'Permite optimizaciones automáticas',
                'Desarrollo más rápido'
            ],
            disadvantages: [
                'Menos control sobre el rendimiento',
                'Puede ser menos eficiente',
                'Debugging más difícil',
                'Dependencia del sistema subyacente'
            ],
            languages: ['SQL', 'HTML/CSS', 'Prolog', 'XSLT', 'Regular Expressions'],
            useCases: [
                'Consultas de bases de datos',
                'Configuración de sistemas',
                'Transformación de documentos',
                'Interfaces de usuario',
                'Reglas de negocio'
            ]
        },
        imperative: {
            title: 'Programación Imperativa',
            color: 'yellow',
            description: 'Paradigma que describe cómo realizar tareas paso a paso mediante instrucciones explícitas que cambian el estado del programa.',
            characteristics: [
                'Instrucciones secuenciales explícitas',
                'Cambio de estado mediante asignaciones',
                'Control de flujo explícito',
                'Variables mutables',
                'Enfoque en el "cómo" hacer las cosas'
            ],
            advantages: [
                'Control total sobre la ejecución',
                'Eficiencia y optimización directa',
                'Fácil mapeo a arquitectura de hardware',
                'Debugging intuitivo',
                'Familiar para la mayoría de programadores'
            ],
            disadvantages: [
                'Propenso a errores de estado',
                'Código más verboso',
                'Difícil paralelización',
                'Mantenimiento complejo en proyectos grandes'
            ],
            languages: ['C', 'C++', 'Java', 'Python', 'JavaScript', 'Assembly'],
            useCases: [
                'Sistemas de bajo nivel',
                'Algoritmos de rendimiento crítico',
                'Controladores de hardware',
                'Juegos en tiempo real',
                'Sistemas embebidos'
            ]
        },
        logic: {
            title: 'Programación Lógica',
            color: 'teal',
            description: 'Paradigma basado en lógica formal, usando hechos y reglas para resolver problemas mediante inferencia automática.',
            characteristics: [
                'Basado en lógica de predicados',
                'Hechos y reglas como base del programa',
                'Inferencia automática',
                'Backtracking para encontrar soluciones',
                'Declarativo y no procedural'
            ],
            advantages: [
                'Expresión natural de problemas lógicos',
                'Búsqueda automática de soluciones',
                'Código muy conciso',
                'Excelente para IA y sistemas expertos',
                'Verificación formal posible'
            ],
            disadvantages: [
                'Rendimiento impredecible',
                'Curva de aprendizaje muy alta',
                'Limitado a ciertos tipos de problemas',
                'Debugging muy complejo'
            ],
            languages: ['Prolog', 'Mercury', 'Datalog', 'ASP (Answer Set Programming)'],
            useCases: [
                'Sistemas expertos',
                'Procesamiento de lenguaje natural',
                'Bases de datos deductivas',
                'Verificación formal',
                'Planificación automática'
            ]
        },
        concurrent: {
            title: 'Programación Concurrente',
            color: 'orange',
            description: 'Paradigma para ejecutar múltiples procesos simultáneamente y coordinar su interacción de manera segura y eficiente.',
            characteristics: [
                'Ejecución simultánea de procesos',
                'Sincronización y comunicación entre procesos',
                'Manejo de recursos compartidos',
                'Prevención de condiciones de carrera',
                'Paralelismo y concurrencia'
            ],
            advantages: [
                'Mejor utilización de recursos',
                'Mayor rendimiento en sistemas multi-core',
                'Responsividad en aplicaciones interactivas',
                'Escalabilidad horizontal',
                'Modelado natural de sistemas distribuidos'
            ],
            disadvantages: [
                'Complejidad de sincronización',
                'Debugging extremadamente difícil',
                'Condiciones de carrera y deadlocks',
                'Overhead de coordinación'
            ],
            languages: ['Go', 'Erlang', 'Java (threads)', 'C# (async/await)', 'Rust', 'Actor Model'],
            useCases: [
                'Servidores web de alto rendimiento',
                'Sistemas distribuidos',
                'Procesamiento paralelo',
                'Aplicaciones en tiempo real',
                'Sistemas de trading'
            ]
        },
        'event-driven': {
            title: 'Programación Orientada a Eventos',
            color: 'cyan',
            description: 'Paradigma donde el flujo del programa está determinado por eventos externos como clics, mensajes o señales del sistema.',
            characteristics: [
                'Flujo controlado por eventos',
                'Event loops y manejadores',
                'Arquitectura asíncrona',
                'Desacoplamiento de componentes',
                'Reactividad a estímulos externos'
            ],
            advantages: [
                'Interfaces de usuario responsivas',
                'Arquitectura flexible y modular',
                'Escalabilidad para I/O intensivo',
                'Desacoplamiento de componentes',
                'Manejo natural de asincronía'
            ],
            disadvantages: [
                'Flujo de control complejo',
                'Debugging difícil',
                'Posible callback hell',
                'Gestión de estado compleja'
            ],
            languages: ['JavaScript', 'Node.js', 'C# (events)', 'Java (listeners)', 'Python (asyncio)'],
            useCases: [
                'Interfaces gráficas de usuario',
                'Aplicaciones web interactivas',
                'Sistemas de notificaciones',
                'Juegos en tiempo real',
                'Sistemas de monitoreo'
            ]
        }
    };
    
    return details[paradigm] || { 
        title: 'Paradigma no encontrado', 
        color: 'gray',
        description: '', 
        characteristics: [], 
        advantages: [], 
        disadvantages: [], 
        languages: [], 
        useCases: [] 
    };
}

// Exportar la función para uso global
window.getDetailsByParadigm = getDetailsByParadigm;