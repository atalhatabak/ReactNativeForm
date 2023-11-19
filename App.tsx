import React from 'react';
import {
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
} from 'react-native';
import { Form, Field } from 'react-final-form'; // form için gerekli kütüphane -> npm install final-form react-final-form  

const required = value => !value && 'Lütfen boş bırakmayınız';

const checkQuestionValue = value => !value ? 'Lütfen boş bırakmayınız' : (isNaN(value)    ? 'Girilen değer numara olmalı'    : "");
// iç içe ternary operatörü, value değeri tanımlı değilse uyarı veriyor, tanımlıysa değerin sayı olup olmadığına bakıyor ve tekrar uyarı yazdırıyor. sayı ilse herhangi birşey yazdırmıyor


const CustomTextInput = ({ placeholder, input, meta, label }) => (
  <View style={styles.container}>
    {label && <Text style={styles.labelTitle}>{label}</Text>}
    <TextInput style={styles.textInput} {...input} placeholder={placeholder} />
    {meta.error && meta.touched && (
      <Text style={styles.errorTitle}>{meta.error}</Text>
    )}
  </View>
);

const Button = ({ handleSubmit }) => (
  <TouchableOpacity
    style={[styles.button, styles.container]}
    onPress={handleSubmit}>
    <Text style={styles.buttonTitle}>Kayıt Ol</Text>
  </TouchableOpacity>
);

const CustomField = ({ name, placeholder, label, validate }) => {
  return (
    <Field
      {...{ name, validate }}
      render={({ input, meta }) => (
        <>
          <CustomTextInput {...{ input, meta, label, placeholder }} />
        </>
      )}
    />
  );
};

const initialValues = { name: '', number: '', email: '', department: '', phone: ''  };

const App = () => {
  return ( // scroolview pencerenin kaydırılmasını sağlıyor
    <ScrollView> 
    <SafeAreaView style={styles.safeArea}>
      <Form
        initialValues={initialValues} // Kayıt Eklendiğinde Alert kısmı
        onSubmit={values => alert(
          "İsim: "+values.name+
          "\nNumara: "+values.number+
          "\nEmail: "+values.email+
          "\nBölüm: "+values.department+
          "\nTelefon: "+values.phone+
          "\nKayıt Başarı İle Eklendi"
        )}
        render={({ handleSubmit }) => {
          return (
            <>
              <CustomField
                name="name"
                validate={required}
                placeholder="Ad Soyad Giriniz"
                label="Ad Soyad"
              />
              <CustomField
                name="number"
                validate={checkQuestionValue}
                placeholder="Okul Numaranızı Giriniz"
                label="Okul Numarası"
              />
              <CustomField
                name="email"
                validate={required}
                placeholder="Eposta Giriniz"
                label="Eposta"
              />
              <CustomField
                name="department"
                validate={required}
                placeholder="Okuduğunuz Bölümü Yazınız"
                label="Bölüm"
                
                
              />
              <CustomField
                name="phone"
                validate={(checkQuestionValue)}
                placeholder="Telefon Numaranızı Giriniz"
                label="Telefon Numarası"
              />
              <Button {...{ handleSubmit }} />
            </>
          );
        }}
      />
    </SafeAreaView>
    </ScrollView>
  );
};

export default App;

const styles = {
  safeArea: {
    /*flex: 1,
    justifyContent: 'center',*/
  },
  container: {
    margin: 12,
  },
  textInput: {
    borderBottomColor: '#787878',
    backgroundColor: '#f4f4f4',
    padding: 16,
    borderRadius: 8,
    color: 'gray',
    fontFamily: 'Avenir-Medium',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6610f2',
    padding: 12,
    borderRadius: 8,
  },
  buttonTitle: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Avenir-Medium',
  },
  errorTitle: {
    fontSize: 13,
    color: 'red',
    fontFamily: 'Avenir-Medium',
    marginTop: 8,
  },
  labelTitle: {
    marginBottom: 8,
    fontSize: 16,
    fontFamily: 'Avenir-Medium',
  },
};