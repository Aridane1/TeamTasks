require("dotenv").config({ path: ".env.test" });
const mongoose = require("mongoose");
const { addTag, deleteOneTag } = require("../controllers/tag.controller");
import Tag from "../models/tag.model"

// Configuración inicial de la base de datos de prueba
beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterEach(async () => {
  await Tag.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("addTag Controller", () => {
  it("should add a new tag", async () => {
    // Mock de req y res
    const req = {
      body: { title: "Test Tag" },
    };
    const res = {
      send: jest.fn(),
      status: jest.fn(() => res),
    };

    await addTag(req, res);

    // Verificar que se envió la respuesta correcta
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.any(Object) })
    );

    // Verificar que el tag se agregó a la base de datos
    const tag = await Tag.findOne({ title: "Test Tag" });
    expect(tag).toBeTruthy();
    expect(tag.title).toBe("Test Tag");
  });
});

describe("deleteOneTag Controller", () => {
  it("should delete a tag correctly", async () => {
    // Primero, crea un tag para luego eliminarlo
    const tagToBeDeleted = new Tag({ title: "Tag to be deleted" });
    await tagToBeDeleted.save();

    // Mock de req y res para simular la solicitud y la respuesta
    const req = {
      params: { id: tagToBeDeleted._id.toString() }, // Convierte el ObjectId a string
    };
    const res = {
      send: jest.fn(),
      status: jest.fn(() => res),
    };

    // Llama al controlador
    await deleteOneTag(req, res);

    // Verifica que la respuesta sea la correcta
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ message: "Etiqueta eliminada correctamente" });

    // Verifica que el tag haya sido eliminado de la base de datos
    const deletedTag = await Tag.findById(tagToBeDeleted._id);
    expect(deletedTag).toBeNull();
  });

  // it("should return a 404 if the tag does not exist", async () => {
  //   // Simula un ID de tag que no existe
  //   const req = {
  //     params: { id: mongoose.Types.ObjectId().toString() },
  //   };
  //   const res = {
  //     send: jest.fn(),
  //     status: jest.fn(() => res),
  //   };

  //   // Llama al controlador
  //   await deleteOneTag(req, res);

  //   // Verifica que se haya retornado un estado 404
  //   expect(res.status).toHaveBeenCalledWith(404);
  //   expect(res.send).toHaveBeenCalledWith("No se encontró la etiqueta");
  // });

  // it("should handle errors gracefully", async () => {
  //   // Simula un error lanzando una excepción cuando findByIdAndDelete es llamado
  //   Tag.findByIdAndDelete = jest.fn().mockRejectedValue(new Error("Error simulado"));

  //   const req = {
  //     params: { id: mongoose.Types.ObjectId().toString() },
  //   };
  //   const res = {
  //     send: jest.fn(),
  //     status: jest.fn(() => res),
  //   };

  //   await deleteOneTag(req, res);

  //   expect(res.status).toHaveBeenCalledWith(500);
  //   expect(res.send).toHaveBeenCalledWith({ message: "Hubo un error al eliminar la etiqueta" });
  // });
});
