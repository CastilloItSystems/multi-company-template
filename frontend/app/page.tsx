import { Button } from "primereact/button";
import { Card } from "primereact/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header/Navbar */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <i className="pi pi-building text-2xl text-blue-600 mr-2" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Multi-Company Platform
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/login">
                <Button label="Iniciar Sesión" text />
              </Link>
              <Link href="/auth/register">
                <Button label="Registrarse" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
            Gestiona Múltiples Empresas
            <br />
            <span className="text-blue-600">En Una Sola Plataforma</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Plataforma modular para gestionar múltiples empresas con sus propios
            modelos de negocio, usuarios y configuraciones independientes.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/auth/register">
              <Button
                label="Comenzar Gratis"
                icon="pi pi-arrow-right"
                size="large"
                className="px-8"
              />
            </Link>
            <Link href="/auth/login">
              <Button
                label="Ver Demo"
                icon="pi pi-play"
                size="large"
                outlined
                className="px-8"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Características Principales
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center">
            <div className="mb-4">
              <i className="pi pi-building text-5xl text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Multi-Tenancy</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Gestiona múltiples empresas con datos aislados y configuraciones
              independientes.
            </p>
          </Card>

          <Card className="text-center">
            <div className="mb-4">
              <i className="pi pi-users text-5xl text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Gestión de Usuarios</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Control de acceso basado en roles con permisos granulares por
              empresa.
            </p>
          </Card>

          <Card className="text-center">
            <div className="mb-4">
              <i className="pi pi-box text-5xl text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Módulos Personalizables</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Cada empresa puede activar solo los módulos que necesita para su
              negocio.
            </p>
          </Card>

          <Card className="text-center">
            <div className="mb-4">
              <i className="pi pi-shield text-5xl text-red-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Seguridad Avanzada</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Autenticación JWT, cookies seguras y protección contra XSS y CSRF.
            </p>
          </Card>

          <Card className="text-center">
            <div className="mb-4">
              <i className="pi pi-chart-line text-5xl text-orange-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Reportes y Analytics</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Visualiza métricas y genera reportes personalizados por empresa.
            </p>
          </Card>

          <Card className="text-center">
            <div className="mb-4">
              <i className="pi pi-mobile text-5xl text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Responsive Design</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Interfaz moderna y adaptable a cualquier dispositivo.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 dark:bg-blue-700 py-16 mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Listo para comenzar?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Crea tu cuenta y empieza a gestionar tus empresas hoy mismo.
          </p>
          <Link href="/auth/register">
            <Button
              label="Comenzar Ahora"
              icon="pi pi-arrow-right"
              size="large"
              severity="secondary"
              className="px-8"
            />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Multi-Company Platform</h3>
              <p className="text-gray-400">
                La solución completa para gestionar múltiples empresas en una
                sola plataforma.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Enlaces</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/auth/login" className="hover:text-white">
                    Iniciar Sesión
                  </Link>
                </li>
                <li>
                  <Link href="/auth/register" className="hover:text-white">
                    Registrarse
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Documentación
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contacto</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <i className="pi pi-envelope mr-2" />
                  info@multicompany.com
                </li>
                <li>
                  <i className="pi pi-phone mr-2" />
                  +1 234 567 8900
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Multi-Company Platform. Todos
              los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
