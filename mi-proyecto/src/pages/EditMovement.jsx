import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMovements } from "../context/MovementsContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  description: Yup.string().min(3, "Mínimo 3 caracteres").required("Requerido"),
  category: Yup.string().required("Seleccione categoría"),
  type: Yup.string().oneOf(["ingreso","gasto"]).required("Seleccione tipo"),
  amount: Yup.number().positive("Debe ser positivo").required("Requerido"),
  date: Yup.date().max(new Date(), "No puede ser futura").required("Requerida")
});

export default function EditMovement() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movements, updateMovement, deleteMovement } = useMovements();

  const current = useMemo(() => movements.find((m) => m.id === id), [movements, id]);
  if (!current) return <div>No encontrado</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Editar movimiento</h2>
      <Formik
        initialValues={{
          description: current.description || "",
          category: current.category || "",
          type: current.type || "gasto",
          amount: current.amount || "",
          date: current.date || "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values,{setSubmitting}) => {
          updateMovement(id, values);
          setSubmitting(false);
          navigate("/");
        }}
        enableReinitialize
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
              <option value="salario">Salario</option>
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

      <button className="mt-3 px-4 py-2 border rounded" onClick={() => { deleteMovement(id); navigate("/"); }}>Eliminar</button>
    </div>
  );
}


