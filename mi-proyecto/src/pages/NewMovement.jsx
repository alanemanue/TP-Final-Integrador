import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMovements } from "../context/MovementsContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

const validationSchema = Yup.object({
  description: Yup.string()
    .min(3, "La descripción debe tener al menos 3 caracteres")
    .required("La descripción es requerida"),
  category: Yup.string().required("Debe seleccionar una categoría"),
  type: Yup.string()
    .oneOf(["ingreso", "gasto"], "Tipo inválido")
    .required("Debe seleccionar un tipo"),
  amount: Yup.number()
    .positive("El monto debe ser un número positivo")
    .required("El monto es requerido"),
  date: Yup.date()
    .max(new Date(), "La fecha no puede ser futura")
    .required("La fecha es requerida")
});

export default function NewMovement() {
  const { addMovement } = useMovements();
  const navigate = useNavigate();

  // Obtener fecha actual en formato YYYY-MM-DD para el valor por defecto
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Nuevo Movimiento</h2>
      
      <Formik
        initialValues={{ 
          description: "", 
          category: "", 
          type: "gasto", 
          amount: "", 
          date: today 
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          try {
            addMovement(values);
            navigate("/");
          } catch (error) {
            console.error("Error al guardar el movimiento:", error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, values, errors, touched }) => (
          <Form className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6 shadow-lg space-y-5">
            {/* Descripción */}
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Descripción *
              </label>
              <Field
                id="description"
                name="description"
                type="text"
                placeholder="Ej: Compra en supermercado"
                className={`w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${
                  errors.description && touched.description
                    ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                    : "border-gray-300 dark:border-slate-600 dark:bg-slate-700"
                }`}
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-sm text-red-600 dark:text-red-400 mt-1 font-medium"
              />
            </div>

            {/* Tipo y Categoría en una fila */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Tipo */}
              <div>
                <label htmlFor="type" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  Tipo *
                </label>
                <Field
                  id="type"
                  name="type"
                  as="select"
                  className={`w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${
                    values.type === "ingreso" 
                      ? "border-green-400 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300" 
                      : "border-red-400 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300"
                  }`}
                >
                  <option value="gasto">💸 Gasto</option>
                  <option value="ingreso">💰 Ingreso</option>
                </Field>
              </div>

              {/* Categoría */}
              <div>
                <label htmlFor="category" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  Categoría *
                </label>
                <Field
                  id="category"
                  name="category"
                  as="select"
                  className={`w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${
                    errors.category && touched.category
                      ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                      : "border-gray-300 dark:border-slate-600 dark:bg-slate-700"
                  }`}
                >
                  <option value="">-- Seleccione una categoría --</option>
                  <option value="alimentacion">🍔 Alimentación</option>
                  <option value="transporte">🚗 Transporte</option>
                  <option value="ocio">🎮 Ocio</option>
                  <option value="salud">🏥 Salud</option>
                  <option value="salario">💼 Salario</option>
                  <option value="servicios">💡 Servicios</option>
                  <option value="vivienda">🏠 Vivienda</option>
                  <option value="educacion">📚 Educación</option>
                  <option value="otros">📦 Otros</option>
                </Field>
                <ErrorMessage
                  name="category"
                  component="div"
                  className="text-sm text-red-600 dark:text-red-400 mt-1 font-medium"
                />
              </div>
            </div>

            {/* Monto y Fecha en una fila */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Monto */}
              <div>
                <label htmlFor="amount" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  Monto ($) *
                </label>
                <Field
                  id="amount"
                  name="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  className={`w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${
                    errors.amount && touched.amount
                      ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                      : "border-gray-300 dark:border-slate-600 dark:bg-slate-700"
                  }`}
                />
                <ErrorMessage
                  name="amount"
                  component="div"
                  className="text-sm text-red-600 dark:text-red-400 mt-1 font-medium"
                />
              </div>

              {/* Fecha */}
              <div>
                <label htmlFor="date" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  Fecha *
                </label>
                <Field
                  id="date"
                  name="date"
                  type="date"
                  max={today}
                  className={`w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${
                    errors.date && touched.date
                      ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                      : "border-gray-300 dark:border-slate-600 dark:bg-slate-700"
                  }`}
                />
                <ErrorMessage
                  name="date"
                  component="div"
                  className="text-sm text-red-600 dark:text-red-400 mt-1 font-medium"
                />
              </div>
            </div>

            {/* Botones */}
            <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-slate-700">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-indigo-600"
              >
                {isSubmitting ? "Guardando..." : "💾 Guardar Movimiento"}
              </Button>
              <Button
                type="button"
                onClick={() => navigate("/")}
                className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-800 dark:text-gray-200 font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                ❌ Cancelar
              </Button>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              * Campos obligatorios
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
}


