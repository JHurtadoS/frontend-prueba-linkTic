import React from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
} from "@react-pdf/renderer";
import { Producto } from "@/services/productos";

const styles = StyleSheet.create({
    page: {
        padding: 10,
    },
    title: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: "center",
    },
    table: {
        display: "flex",
        flexDirection: "column",
        borderWidth: 1,
        borderColor: "#000",
    },
    tableRow: {
        display: "flex",
        flexDirection: "row",
    },
    tableCell: {
        flexGrow: 1,
        flexShrink: 0,
        flexBasis: "auto",
        borderWidth: 1,
        borderColor: "#000",
        padding: 5,
        fontSize: 10,
        textAlign: "center",
    },
    cellID: {
        flexBasis: "20%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
    cellText: {
        flexBasis: "15%",
    },
    cellPrice: {
        flexBasis: "10%",
        textAlign: "right",
    },
});



interface ReporteInventarioProps {
    productos: Producto[];
}

const ReporteInventario: React.FC<ReporteInventarioProps> = ({ productos }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.title}>Reporte de Inventario</Text>
            <View style={styles.table}>
                {/* Encabezado de la tabla */}
                <View style={[styles.tableRow, { backgroundColor: "#f0f0f0" }]}>
                    <Text style={[styles.tableCell, styles.cellID]}>ID</Text>
                    <Text style={[styles.tableCell, styles.cellText]}>Nombre</Text>
                    <Text style={[styles.tableCell, styles.cellText]}>Descripción</Text>
                    <Text style={[styles.tableCell, styles.cellPrice]}>Precio</Text>
                    <Text style={[styles.tableCell, styles.cellPrice]}>Stock</Text>
                    <Text style={[styles.tableCell, styles.cellText]}>Estado</Text>
                </View>
                {/* Filas de la tabla */}
                {productos.map((producto) => (
                    <View style={styles.tableRow} key={producto.id}>
                        <Text style={[styles.tableCell, styles.cellID]}>{producto.id}</Text>
                        <Text style={[styles.tableCell, styles.cellText]}>
                            {producto.nombre}
                        </Text>
                        <Text style={[styles.tableCell, styles.cellText]}>
                            {producto.descripcion || "N/A"}
                        </Text>
                        <Text style={[styles.tableCell, styles.cellPrice]}>
                            ${producto.precio.toFixed(2)}
                        </Text>
                        <Text style={[styles.tableCell, styles.cellPrice]}>
                            {producto.stock}
                        </Text>
                        <Text style={[styles.tableCell, styles.cellText]}>
                            {producto.estado ? "Activo" : "Inactivo"}
                        </Text>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
);

export default ReporteInventario;
