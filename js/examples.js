// Ejemplos completos para todos los paradigmas de programación
function getExamplesByParadigm(paradigm) {
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
    filter(pos => pos.x > 100),
    map(pos => ({ ...pos, quadrant: getQuadrant(pos) }))
);

throttledMovements.subscribe(pos => {
    console.log(\`Mouse en cuadrante \${pos.quadrant}\`);
});`,
                    explanation: 'Muestra cómo RxJS maneja streams de eventos, transformaciones reactivas y suscripciones a flujos de datos.'
                }
            ]
        },
        procedural: {
            title: 'Programación Procedural - Ejemplos',
            description: 'La programación procedural organiza el código en procedimientos y funciones reutilizables.',
            codes: [
                {
                    title: 'Ejemplo en C - Sistema de Gestión de Estudiantes',
                    code: `#include <stdio.h>
#include <string.h>

// Estructura de datos
struct Estudiante {
    int id;
    char nombre[50];
    float promedio;
};

// Procedimientos para manejar estudiantes
void inicializar_estudiante(struct Estudiante* est, int id, char* nombre, float promedio) {
    est->id = id;
    strcpy(est->nombre, nombre);
    est->promedio = promedio;
}

void mostrar_estudiante(struct Estudiante est) {
    printf("ID: %d, Nombre: %s, Promedio: %.2f\\n", 
           est.id, est.nombre, est.promedio);
}

float calcular_promedio_general(struct Estudiante estudiantes[], int cantidad) {
    float suma = 0;
    for (int i = 0; i < cantidad; i++) {
        suma += estudiantes[i].promedio;
    }
    return suma / cantidad;
}

void buscar_por_id(struct Estudiante estudiantes[], int cantidad, int id_buscar) {
    for (int i = 0; i < cantidad; i++) {
        if (estudiantes[i].id == id_buscar) {
            printf("Estudiante encontrado:\\n");
            mostrar_estudiante(estudiantes[i]);
            return;
        }
    }
    printf("Estudiante con ID %d no encontrado\\n", id_buscar);
}

int main() {
    struct Estudiante estudiantes[3];
    
    // Inicializar estudiantes usando procedimientos
    inicializar_estudiante(&estudiantes[0], 1, "Ana García", 8.5);
    inicializar_estudiante(&estudiantes[1], 2, "Luis Pérez", 7.8);
    inicializar_estudiante(&estudiantes[2], 3, "María López", 9.2);
    
    // Mostrar todos los estudiantes
    printf("Lista de estudiantes:\\n");
    for (int i = 0; i < 3; i++) {
        mostrar_estudiante(estudiantes[i]);
    }
    
    // Calcular y mostrar promedio general
    float promedio_general = calcular_promedio_general(estudiantes, 3);
    printf("\\nPromedio general: %.2f\\n", promedio_general);
    
    // Buscar estudiante por ID
    buscar_por_id(estudiantes, 3, 2);
    
    return 0;
}`,
                    explanation: 'Demuestra la organización del código en procedimientos que operan sobre estructuras de datos, típico de la programación procedural.'
                }
            ]
        },
        declarative: {
            title: 'Programación Declarativa - Ejemplos',
            description: 'La programación declarativa describe qué se quiere lograr sin especificar cómo hacerlo.',
            codes: [
                {
                    title: 'Ejemplo en SQL - Consultas Declarativas',
                    code: `-- Crear tabla de empleados
CREATE TABLE empleados (
    id INT PRIMARY KEY,
    nombre VARCHAR(100),
    departamento VARCHAR(50),
    salario DECIMAL(10,2),
    fecha_ingreso DATE
);

-- Insertar datos
INSERT INTO empleados VALUES 
(1, 'Ana García', 'Desarrollo', 75000, '2020-01-15'),
(2, 'Luis Pérez', 'Marketing', 65000, '2019-03-20'),
(3, 'María López', 'Desarrollo', 80000, '2021-06-10'),
(4, 'Carlos Ruiz', 'Ventas', 70000, '2020-11-05');

-- Consultas declarativas - describimos QUÉ queremos, no CÓMO obtenerlo

-- Obtener empleados del departamento de Desarrollo
SELECT nombre, salario 
FROM empleados 
WHERE departamento = 'Desarrollo';

-- Calcular salario promedio por departamento
SELECT departamento, AVG(salario) as salario_promedio
FROM empleados 
GROUP BY departamento;

-- Encontrar empleados con salario mayor al promedio
SELECT nombre, salario
FROM empleados 
WHERE salario > (SELECT AVG(salario) FROM empleados);

-- Empleados contratados en los últimos 2 años
SELECT nombre, fecha_ingreso
FROM empleados 
WHERE fecha_ingreso >= DATE_SUB(CURDATE(), INTERVAL 2 YEAR)
ORDER BY fecha_ingreso DESC;

-- Contar empleados por departamento
SELECT departamento, COUNT(*) as total_empleados
FROM empleados 
GROUP BY departamento
HAVING COUNT(*) > 1;`,
                    explanation: 'SQL es declarativo: especificamos qué datos queremos obtener, y el motor de base de datos decide cómo ejecutar la consulta de manera óptima.'
                }
            ]
        },
        imperative: {
            title: 'Programación Imperativa - Ejemplos',
            description: 'La programación imperativa describe paso a paso cómo realizar las tareas.',
            codes: [
                {
                    title: 'Ejemplo en Python - Algoritmo de Ordenamiento',
                    code: `def ordenamiento_burbuja(lista):
    """
    Implementación imperativa del algoritmo de ordenamiento burbuja.
    Especifica exactamente CÓMO ordenar paso a paso.
    """
    n = len(lista)
    
    # Bucle externo: controla el número de pasadas
    for i in range(n):
        # Flag para optimización
        intercambio = False
        
        # Bucle interno: compara elementos adyacentes
        for j in range(0, n - i - 1):
            # Instrucción condicional explícita
            if lista[j] > lista[j + 1]:
                # Intercambio explícito paso a paso
                temp = lista[j]
                lista[j] = lista[j + 1]
                lista[j + 1] = temp
                intercambio = True
        
        # Si no hubo intercambios, la lista ya está ordenada
        if not intercambio:
            break
    
    return lista

def busqueda_lineal(lista, elemento):
    """
    Búsqueda lineal imperativa - especifica cada paso
    """
    # Inicializar variables de control
    posicion = -1
    encontrado = False
    
    # Iterar explícitamente a través de cada elemento
    for i in range(len(lista)):
        # Comparación explícita
        if lista[i] == elemento:
            posicion = i
            encontrado = True
            break  # Salida explícita del bucle
    
    return encontrado, posicion

def procesar_numeros():
    """
    Función principal que demuestra control de flujo imperativo
    """
    # Inicialización explícita de datos
    numeros = [64, 34, 25, 12, 22, 11, 90]
    print("Lista original:", numeros)
    
    # Crear copia para no modificar original
    numeros_copia = numeros.copy()
    
    # Llamada explícita al procedimiento de ordenamiento
    numeros_ordenados = ordenamiento_burbuja(numeros_copia)
    print("Lista ordenada:", numeros_ordenados)
    
    # Búsqueda imperativa
    elemento_buscar = 25
    encontrado, posicion = busqueda_lineal(numeros_ordenados, elemento_buscar)
    
    # Control de flujo condicional explícito
    if encontrado:
        print(f"Elemento {elemento_buscar} encontrado en posición {posicion}")
    else:
        print(f"Elemento {elemento_buscar} no encontrado")

# Ejecución del programa
if __name__ == "__main__":
    procesar_numeros()`,
                    explanation: 'Este ejemplo muestra programación imperativa pura: cada paso está explícitamente definido, con control total sobre el flujo de ejecución y modificación de estado.'
                }
            ]
        },
        logic: {
            title: 'Programación Lógica - Ejemplos',
            description: 'La programación lógica usa hechos y reglas para resolver problemas mediante inferencia.',
            codes: [
                {
                    title: 'Ejemplo en Prolog - Sistema Familiar',
                    code: `% Hechos básicos sobre relaciones familiares
padre(juan, maria).
padre(juan, pedro).
padre(pedro, ana).
padre(pedro, luis).
padre(carlos, juan).

madre(lucia, maria).
madre(lucia, pedro).
madre(maria, ana).
madre(maria, luis).
madre(rosa, juan).

% Reglas lógicas
% Una persona es progenitor si es padre o madre
progenitor(X, Y) :- padre(X, Y).
progenitor(X, Y) :- madre(X, Y).

% Definición de hermano/hermana
hermano(X, Y) :- 
    progenitor(Z, X), 
    progenitor(Z, Y), 
    X \\= Y.

% Definición de abuelo
abuelo(X, Y) :- 
    padre(X, Z), 
    progenitor(Z, Y).

% Definición de abuela
abuela(X, Y) :- 
    madre(X, Z), 
    progenitor(Z, Y).

% Definición de tío
tio(X, Y) :- 
    hermano(X, Z), 
    progenitor(Z, Y).

% Definición de primo
primo(X, Y) :- 
    progenitor(Z, X), 
    progenitor(W, Y), 
    hermano(Z, W).

% Consultas que se pueden hacer:
% ?- padre(juan, maria).        % ¿Es Juan padre de María?
% ?- hermano(maria, pedro).     % ¿Son María y Pedro hermanos?
% ?- abuelo(carlos, ana).       % ¿Es Carlos abuelo de Ana?
% ?- primo(ana, X).             % ¿Quiénes son primos de Ana?`,
                    explanation: 'Prolog permite definir hechos y reglas, luego hacer consultas. El sistema infiere automáticamente las respuestas usando lógica de predicados.'
                }
            ]
        },
        concurrent: {
            title: 'Programación Concurrente - Ejemplos',
            description: 'La programación concurrente permite ejecutar múltiples procesos simultáneamente.',
            codes: [
                {
                    title: 'Ejemplo en Go - Goroutines y Channels',
                    code: `package main

import (
    "fmt"
    "sync"
    "time"
)

// Función que simula trabajo pesado
func trabajador(id int, trabajos <-chan int, resultados chan<- int, wg *sync.WaitGroup) {
    defer wg.Done()
    
    for trabajo := range trabajos {
        fmt.Printf("Trabajador %d procesando trabajo %d\\n", id, trabajo)
        
        // Simular trabajo pesado
        time.Sleep(time.Second)
        
        // Enviar resultado
        resultados <- trabajo * 2
    }
}

// Función que produce trabajos
func productor(trabajos chan<- int, numTrabajos int) {
    for i := 1; i <= numTrabajos; i++ {
        trabajos <- i
        fmt.Printf("Trabajo %d enviado\\n", i)
    }
    close(trabajos)
}

// Función que consume resultados
func consumidor(resultados <-chan int, numResultados int, done chan<- bool) {
    for i := 0; i < numResultados; i++ {
        resultado := <-resultados
        fmt.Printf("Resultado recibido: %d\\n", resultado)
    }
    done <- true
}

func main() {
    const numTrabajos = 5
    const numTrabajadores = 3
    
    // Crear channels
    trabajos := make(chan int, numTrabajos)
    resultados := make(chan int, numTrabajos)
    done := make(chan bool)
    
    // WaitGroup para sincronizar trabajadores
    var wg sync.WaitGroup
    
    // Iniciar trabajadores concurrentes
    for i := 1; i <= numTrabajadores; i++ {
        wg.Add(1)
        go trabajador(i, trabajos, resultados, &wg)
    }
    
    // Iniciar productor
    go productor(trabajos, numTrabajos)
    
    // Iniciar consumidor
    go consumidor(resultados, numTrabajos, done)
    
    // Esperar a que terminen los trabajadores
    go func() {
        wg.Wait()
        close(resultados)
    }()
    
    // Esperar a que termine el consumidor
    <-done
    
    fmt.Println("Todos los trabajos completados")
}`,
                    explanation: 'Este ejemplo muestra concurrencia en Go usando goroutines (hilos ligeros) y channels para comunicación segura entre procesos concurrentes.'
                }
            ]
        },
        'event-driven': {
            title: 'Programación Orientada a Eventos - Ejemplos',
            description: 'El flujo del programa está controlado por eventos externos como clics, mensajes o señales.',
            codes: [
                {
                    title: 'Ejemplo en JavaScript - Sistema de Eventos DOM',
                    code: `// Sistema de eventos para una aplicación web interactiva

class EventDrivenApp {
    constructor() {
        this.eventHandlers = new Map();
        this.setupEventListeners();
    }
    
    // Configurar listeners para eventos del DOM
    setupEventListeners() {
        // Evento de clic en botón
        document.getElementById('submitBtn')?.addEventListener('click', (event) => {
            this.handleSubmit(event);
        });
        
        // Evento de cambio en input
        document.getElementById('searchInput')?.addEventListener('input', (event) => {
            this.handleSearch(event);
        });
        
        // Evento de scroll en ventana
        window.addEventListener('scroll', (event) => {
            this.handleScroll(event);
        });
        
        // Evento personalizado
        document.addEventListener('customDataUpdate', (event) => {
            this.handleDataUpdate(event);
        });
        
        // Eventos de teclado
        document.addEventListener('keydown', (event) => {
            this.handleKeyPress(event);
        });
    }
    
    // Manejador de evento de envío
    handleSubmit(event) {
        event.preventDefault();
        console.log('Formulario enviado');
        
        // Disparar evento personalizado
        this.emitCustomEvent('formSubmitted', {
            timestamp: new Date(),
            formData: new FormData(event.target.form)
        });
    }
    
    // Manejador de búsqueda con debounce
    handleSearch(event) {
        clearTimeout(this.searchTimeout);
        
        this.searchTimeout = setTimeout(() => {
            const query = event.target.value;
            console.log('Buscando:', query);
            
            // Simular búsqueda asíncrona
            this.performSearch(query).then(results => {
                this.emitCustomEvent('searchCompleted', { query, results });
            });
        }, 300);
    }
    
    // Manejador de scroll
    handleScroll(event) {
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            this.emitCustomEvent('scrollThresholdReached', { scrollY });
        }
    }
    
    // Manejador de actualización de datos
    handleDataUpdate(event) {
        console.log('Datos actualizados:', event.detail);
        this.updateUI(event.detail);
    }
    
    // Manejador de teclas
    handleKeyPress(event) {
        const shortcuts = {
            'Escape': () => this.closeModals(),
            'Enter': () => this.handleEnterKey(event),
            'F1': () => this.showHelp()
        };
        
        if (shortcuts[event.key]) {
            event.preventDefault();
            shortcuts[event.key]();
        }
    }
    
    // Función para emitir eventos personalizados
    emitCustomEvent(eventName, data) {
        const customEvent = new CustomEvent(eventName, {
            detail: data,
            bubbles: true
        });
        document.dispatchEvent(customEvent);
    }
    
    // Simular búsqueda asíncrona
    async performSearch(query) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve([
                    \`Resultado 1 para "\${query}"\`,
                    \`Resultado 2 para "\${query}"\`,
                    \`Resultado 3 para "\${query}"\`
                ]);
            }, 500);
        });
    }
    
    // Actualizar interfaz basada en eventos
    updateUI(data) {
        const statusElement = document.getElementById('status');
        if (statusElement) {
            statusElement.textContent = \`Última actualización: \${new Date().toLocaleTimeString()}\`;
        }
    }
    
    closeModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
    }
    
    handleEnterKey(event) {
        if (event.target.tagName === 'INPUT') {
            event.target.blur();
        }
    }
    
    showHelp() {
        alert('Ayuda: Use Escape para cerrar, Enter para confirmar');
    }
}

// Inicializar la aplicación orientada a eventos
document.addEventListener('DOMContentLoaded', () => {
    new EventDrivenApp();
});

// Ejemplo de uso con eventos personalizados
setTimeout(() => {
    document.dispatchEvent(new CustomEvent('customDataUpdate', {
        detail: { message: 'Datos cargados desde el servidor' }
    }));
}, 2000);`,
                    explanation: 'Este ejemplo muestra cómo la programación orientada a eventos responde a diferentes estímulos (clics, teclas, scroll) y cómo los eventos pueden encadenar otras acciones, creando un flujo reactivo.'
                }
            ]
        }
    };
    
    return examples[paradigm] || { 
        title: 'Paradigma no encontrado', 
        description: '', 
        codes: [] 
    };
}

// Exportar la función para uso global
window.getExamplesByParadigm = getExamplesByParadigm;