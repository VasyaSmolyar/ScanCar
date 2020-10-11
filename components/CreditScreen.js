import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { host } from '../constants';
import close from '../assets/return.png';
import CheckBox from '@react-native-community/checkbox';


function FieldInput({name, field, setField, edit, multiline}) {
    return (
        <View style={styles.fieldContainer}>
            <Text style={styles.fieldName}>{name}</Text>
            <TextInput editable={edit === true} style={styles.fieldValue} value={field}
             onChangeText={setField} multiline={multiline === true} />
        </View>
    );
}

export default function CreditScreen ({ route, navigation }) {
    const { item, credit } = route.params;

    const [ income, setIncome ] = useState('');
    const [ lastName, setLast ] = useState('');
    const [ firstName, setFirst ] = useState('');
    const [ secondName, setSecond ] = useState('');
    const [ sex, setSex ] = useState('');
    const [ mail, setMail ] = useState('');
    const [ phone, setPhone ] = useState('');
    const [ comment, setComment ] = useState('');
    const [ assign, setAssign ] = useState(false);

    const delim = (price) => {
        let parts = price.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return parts.join(".");
    }

    const onSend =  async () => {
        const response = await fetch(host + 'api/credit/apply', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                comment: comment,
                    email: mail,
                    income_amount : income, 
                    birth_date_time : "1991-01-01",
                    birth_place : "Москва",
                    family_name : lastName,
                    first_name : firstName,
                    middle_name : secondName,
                    gender: "male",
                    nationality_country_code: "RU",
                    phone: phone,
                    interest_rate: credit.contractRate,
                    requested_amount: credit.payment,
                    requested_term: credit.term / 12,
                    trade_mark: item.model + " " + item.brand,
                    vehicle_cost: item.price
            }),
        });
        const json = await response.json();
        console.log(json);
        navigation.navigate("Final", {data: json, item: item});
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Оформление кредита</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Calculate", {item: item})}>
                    <Image source={close} style={styles.closeImage} resizeMode='contain' />
                </TouchableOpacity>
            </View>
            <ScrollView>
                <FieldInput field={item.model + " " + item.brand} name="Марка авто" />
                <FieldInput field={delim(item.price) + " ₽"} name="Стоимость авто" />
                <FieldInput field={(credit.term / 12).toFixed(2) + " лет" } name="Срок кредита" />
                <FieldInput field={credit.contractRate.toString() + "%"} name="Ставка кредита" />
                <FieldInput field={delim(credit.payment) + " ₽"} name="Ежемесячный платёж" />

                <FieldInput field={income} setField={setIncome} name="Доход в месяц" edit={true} />
                <FieldInput field={lastName} setField={setLast} name="Фамилия" edit={true} />
                <FieldInput field={firstName} setField={setFirst} name="Имя" edit={true} />
                <FieldInput field={secondName} setField={setSecond} name="Отчество" edit={true} />
                <FieldInput field={sex} setField={setSex} name="Пол" edit={true} />
                <FieldInput field={mail} setField={setMail} name="Почта" edit={true} />
                <FieldInput field={phone} setField={setPhone} name="Телефон" edit={true} />
                <FieldInput field={comment} setField={setComment} name="Комментарий" 
                edit={true} multiline={true} />

                <View style={styles.assignContainer}>
                    <CheckBox value={assign} onValueChange={setAssign} />
                    <View style={styles.textContainer}>
                        <Text style={styles.textAssign}>Я согласен с условиями договора и потверждаю своё согласие на обработку персональных данных Банком</Text>
                        <Text style={styles.textMore}>Открыть список документов</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.creditButton} onPress={onSend}>
                    <Text style={styles.creditText}>Расчитать кредит</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
	container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 30
	},
	headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 25,
        paddingTop: 35
    },
    headerText: {
        fontFamily: 'SFPro',
        fontSize: 20,
        fontWeight: 'bold'
    },
    fieldContainer: {
        marginBottom: 30
    },
    fieldName: {
        fontFamily: 'SFPro',
        fontSize: 15,
        color: '#3a83f1',
        marginBottom: 5,
        fontWeight: 'bold'
    },
    fieldValue: {
        borderBottomColor: '#3a83f1',
        borderBottomWidth: 1,
        fontFamily: 'SFPro',
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black'
    },
    closeImage: {
        width: 30,
        height: 30
    },
    assignContainer: {
        flexDirection: 'row',
        marginVertical: 15
    },
    textContainer: {
        fontFamily: 'SFPro',
        fontSize: 15,
    },
    textAssign: {
        fontFamily: 'SFPro',
        fontSize: 15,
        marginBottom: 15
    },
    textMore: {
        fontFamily: 'SFPro',
        fontSize: 15,
    },
    creditButton: {
        borderRadius: 10,
        width: '100%',
        backgroundColor: '#3a83f1',
        alignItems: 'center',
        paddingVertical: 10,
        marginBottom: 50
    },
    creditText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'SFPro',
        textTransform: "uppercase",
        letterSpacing: 1.5,
    },
});