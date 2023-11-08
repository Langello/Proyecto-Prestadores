import { Prestador } from "../../models/prestadorMODEL.js";

export async function actualizarPrestador(req, res) {
    const idPrestador = req.params.idPrestador;

    const {
        cuil_cuit,
        descripcion,
        fotos_trabajos_realizados,
        horarios_atencion,
        disponibilidad,
        radio_cobertura,
    } = req.body;

    try {
        const prestador = await Prestador.findByPk(idPrestador);
        if (!prestador) {
            return res.status(404).json({ msg: "Prestador no encontrado" });
        }

        prestador.cuil_cuit = cuil_cuit;
        prestador.descripcion = descripcion;
        prestador.fotos_trabajos_realizados = fotos_trabajos_realizados;
        prestador.horarios_atencion = horarios_atencion;
        prestador.disponibilidad = disponibilidad;
        prestador.radio_cobertura = radio_cobertura;

        await prestador.save();

        res.status(200).json({ msg: "Prestador actualizado" });
    }

    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al actualizar el prestador: " + error });
    }
}