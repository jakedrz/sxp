import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {colors} from "../constants/colors";

const styles = StyleSheet.create({
    section: {
        marginBottom: 24,
        width: '100%',
        flexGrow:1
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: colors.label.secondary, // secondary label color
        marginBottom: 8,
        marginLeft: 8,
    },
    card: {
        backgroundColor: colors.background.grouped.secondary, // secondary system background light mode
        borderRadius: 16,
        borderCurve: 'continuous',
        paddingHorizontal: 16,
        // overflow: 'hidden',
        // shadowColor: '#000',
        // shadowOpacity: 0.05,
        // shadowRadius: 4,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 14,
        // paddingHorizontal: 16,
    },
    rowBorder: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#E5E5EA',
    },
    label: {
        fontSize: 16,
        color: colors.label.primary,
    },
    value: {
        fontSize: 16,
        color: colors.label.secondary, // keep numbers aligned nicely
    },
});

export const InfoSection = ({ title, data }) => (
    <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.card}>
            {data.map(({ label, value }, index) => (
                <View
                    key={label}
                    style={[
                        styles.row,
                        index < data.length - 1 && styles.rowBorder, // divider between rows
                    ]}
                >
                    <Text style={styles.label}>{label}</Text>
                    <Text style={styles.value}>{value}</Text>
                </View>
            ))}
        </View>
    </View>
);