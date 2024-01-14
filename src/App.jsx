import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";

const SKDSchema = Yup.object().shape({
  nik: Yup.string().required("NIK is required"),
  nama: Yup.string().required("Nama is required"),
  tempatLahir: Yup.string().required("Tempat Lahir is required"),
  tanggalLahir: Yup.date().required("Tanggal Lahir is required"),
  alamat: Yup.string().required("Alamat is required"),
  agama: Yup.string().required("Agama is required"),
  kelamin: Yup.string().required("Kelamin is required"),
  status: Yup.string().required("Status is required"),
  pekerjaan: Yup.string().required("Pekerjaan is required"),
});

const SKDForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SKDSchema),
  });

  const onSubmit = (data) => {
    createWordDocument(data);
  };

  const createWordDocument = async (formData) => {
    try {
      // Fetch template content from server
      const templateResponse = await fetch("/assets/template/template.docx");
      const templateContent = await templateResponse.arrayBuffer();

      // Create a new PizZip instance and load the template content
      const zip = new PizZip(templateContent);
      // Create a new Docxtemplater instance
      const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

      // Set the data for document rendering
      doc.setData({
        nik: formData.nik,
        nama: formData.nama,
        tempatLahir: formData.tempatLahir,
        tanggalLahir: formData.tanggalLahir,
        alamat: formData.alamat,
        agama: formData.agama,
        kelamin: formData.kelamin,
        status: formData.status,
        pekerjaan: formData.pekerjaan,
      });

      // Render the document
      doc.render();

      // Generate a blob for the document
      const blob = doc.getZip().generate({
        type: "blob",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      // Save the document using FileSaver
      saveAs(blob, "result.docx");
    } catch (error) {
      console.error("Error creating document:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        NIK:
        <input type="text" {...register("nik")} />
        {errors.nik && <p>{errors.nik.message}</p>}
      </label>
      <br />
      <label>
        Nama:
        <input type="text" {...register("nama")} />
        {errors.nama && <p>{errors.nama.message}</p>}
      </label>
      <br />
      <label>
        Tempat Lahir:
        <input type="text" {...register("tempatLahir")} />
        {errors.tempatLahir && <p>{errors.tempatLahir.message}</p>}
      </label>
      <br />
      <label>
        Tanggal Lahir:
        <input type="date" {...register("tanggalLahir")} />
        {errors.tanggalLahir && <p>{errors.tanggalLahir.message}</p>}
      </label>
      <br />
      <label>
        Alamat:
        <input type="text" {...register("alamat")} />
        {errors.alamat && <p>{errors.alamat.message}</p>}
      </label>
      <br />
      <label>
        Agama:
        <input type="text" {...register("agama")} />
        {errors.agama && <p>{errors.agama.message}</p>}
      </label>
      <br />
      <label>
        Kelamin:
        <input type="text" {...register("kelamin")} />
        {errors.kelamin && <p>{errors.kelamin.message}</p>}
      </label>
      <br />
      <label>
        Status:
        <input type="text" {...register("status")} />
        {errors.status && <p>{errors.status.message}</p>}
      </label>
      <br />
      <label>
        Pekerjaan:
        <input type="text" {...register("pekerjaan")} />
        {errors.pekerjaan && <p>{errors.pekerjaan.message}</p>}
      </label>
      <br />
      <button type="submit">Generate Document</button>
    </form>
  );
};

export default SKDForm;
