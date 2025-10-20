import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMovements } from "../context/MovementsContext";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  description: Yup.string().min(3, "Mínimo 3 caracteres").required("Requerido"),
  category: Yup.string().required("Seleccione categoría"),
  type: Yup.string().oneOf(["ingreso","gasto"]).required("Seleccione tipo"),
  amount: Yup.number().positive("Debe ser positivo").required("Requerido"),
  date: Yup.date().max(new Date(), "No puede ser futura").required("Requerida")
});

export default function NewMovement() {
  const { addMovement } = useMovements();
  const navigate = useNavigate();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Nuevo movimiento</h2>
      <Formik
        initialValues={{ description: "", category: "", type: "gasto", amount: "", date: "" }}
        validationSchema={validationSchema}
        onSubmit={(values,{setSubmitting}) => {
          addMovement(values);
          setSubmitting(false);
          navigate("/");
        }}
      >
        {({ isSubmitting }) => (
          <Form className="bg-white border rounded-lg p-4 space-y-3 max-w-lg">
            <label className="block text-sm font-medium">Descripción</label>
            <Field className="border rounded px-3 py-2 w-full" name="description" />
            <ErrorMessage className="text-sm text-red-600" name="description" component="div" />

            <label className="block text-sm font-medium">Categoría</label>
            <Field className="border rounded px-3 py-2 w-full" as="select" name="category">
              <option value="">--Seleccione--</option>
              <option value="alimentacion">Alimentación</option>
              <option value="transporte">Transporte</option>
              <option value="ocio">Ocio</option>
              <option value="salud">Salud</option>
            </Field>
            <ErrorMessage className="text-sm text-red-600" name="category" component="div" />

            <label className="block text-sm font-medium">Tipo</label>
            <Field className="border rounded px-3 py-2 w-full" as="select" name="type">
              <option value="gasto">Gasto</option>
              <option value="ingreso">Ingreso</option>
            </Field>

            <label className="block text-sm font-medium">Monto</label>
            <Field className="border rounded px-3 py-2 w-full" name="amount" type="number" step="0.01" />
            <ErrorMessage className="text-sm text-red-600" name="amount" component="div" />

            <label className="block text-sm font-medium">Fecha</label>
            <Field className="border rounded px-3 py-2 w-full" name="date" type="date" />
            <ErrorMessage className="text-sm text-red-600" name="date" component="div" />

            <button className="px-4 py-2 border rounded" type="submit" disabled={isSubmitting}>Guardar</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}


