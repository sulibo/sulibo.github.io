---
layout: post
title: Yet Another Kaggle Titanic Competition Tutorial 
tags:
- machine learning
- deep learning
- tensorflow
- Keras
- Kaggle
categories:
- Tech
toc: true
comments: true
date: 2020-11-23 21:09 +0100
---
This post is a tutorial on solving the [Kaggle Titanic Competition](https://www.kaggle.com/c/titanic) using Deep Neural Network with the [TensorFlow](https://www.tensorflow.org) API [Keras](https://keras.io). [Kaggle](https://www.kaggle.com) is a competition site which provides problems to solve or questions to ask while providing the datasets for training your data science model and testing the model results against a test dataset. 
<!--more-->
The Titanic competition is probably the first competition you will come across on Kaggle. The goal of the competition is to predict the possibility of survival of the passengers onboard, a typical classification problem.  

This tutorial follows a typical workflow of machine learning project. 
1. Define the problem 
2. Acquire the data
3. Prepare the data 
4. Define the model
5. Train and fine-tune the model
6. Test and deploy the model

The accompanying notebook of this tutorial is available [here](https://github.com/sulibo/code_snipets/tree/main/Machine_Learning/Kaggle/Titanic).

## Define the problem
The question or problem definition for Titanic Survival competition is [described here at Kaggle](https://www.kaggle.com/c/titanic).

> Knowing from a training set of samples listing passengers who survived or did not survive the Titanic disaster, can our model determine based on a given test dataset not containing the survival information, if these passengers in the test dataset survived or not.

Kaggle already provides some early understanding about the domain of this problem, see the [Kaggle competition description page here](https://www.kaggle.com/c/titanic). Here are the highlights to note.

- On April 15, 1912, during her maiden voyage, the Titanic sank after colliding with an iceberg, killing 1502 out of 2224 passengers and crew. Translated 32% survival rate.
- One of the reasons that the shipwreck led to such loss of life was that there were not enough lifeboats for the passengers and crew.
- Although there was some element of luck involved in surviving the sinking, some groups of people were more likely to survive than others, such as women, children, and the upper-class.

Before going forward, we need to import some necessary modules. 


```python
# data analysis
import numpy as np 
import pandas as pd 

# visualization 
import matplotlib.pyplot as plt 
import seaborn as sns 

# machine learning 
import sklearn
from sklearn.model_selection import train_test_split
import tensorflow as tf
from tensorflow.python.framework import ops

# utils
import warnings 
warnings.filterwarnings('ignore')
%matplotlib inline
```

## Acquire the data

The Python Pandas packages are used to acquire the data. The data consists of two groups: a training set (train.csv)
and test set (test.csv). 

The training set should be used to build the machine learning models. For the training set, the outcome (also known as the “ground truth”) for each passenger is provided. 

The test set should be used to see how well your model performs on unseen data. For the test set, the ground truth for each passenger is not provided. The machine learning models will be used to predict the surival of each passenger.  


```python
train_data = pd.read_csv('./Dataset/train.csv')
test_data = pd.read_csv('./Dataset/test.csv')
```


```python
train_data.head()
```




<div style="overflow-x:auto;">
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>PassengerId</th>
      <th>Survived</th>
      <th>Pclass</th>
      <th>Name</th>
      <th>Sex</th>
      <th>Age</th>
      <th>SibSp</th>
      <th>Parch</th>
      <th>Ticket</th>
      <th>Fare</th>
      <th>Cabin</th>
      <th>Embarked</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>0</td>
      <td>3</td>
      <td>Braund, Mr. Owen Harris</td>
      <td>male</td>
      <td>22.0</td>
      <td>1</td>
      <td>0</td>
      <td>A/5 21171</td>
      <td>7.2500</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>1</td>
      <td>1</td>
      <td>Cumings, Mrs. John Bradley (Florence Briggs Th...</td>
      <td>female</td>
      <td>38.0</td>
      <td>1</td>
      <td>0</td>
      <td>PC 17599</td>
      <td>71.2833</td>
      <td>C85</td>
      <td>C</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3</td>
      <td>1</td>
      <td>3</td>
      <td>Heikkinen, Miss. Laina</td>
      <td>female</td>
      <td>26.0</td>
      <td>0</td>
      <td>0</td>
      <td>STON/O2. 3101282</td>
      <td>7.9250</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
    <tr>
      <th>3</th>
      <td>4</td>
      <td>1</td>
      <td>1</td>
      <td>Futrelle, Mrs. Jacques Heath (Lily May Peel)</td>
      <td>female</td>
      <td>35.0</td>
      <td>1</td>
      <td>0</td>
      <td>113803</td>
      <td>53.1000</td>
      <td>C123</td>
      <td>S</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5</td>
      <td>0</td>
      <td>3</td>
      <td>Allen, Mr. William Henry</td>
      <td>male</td>
      <td>35.0</td>
      <td>0</td>
      <td>0</td>
      <td>373450</td>
      <td>8.0500</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
  </tbody>
</table>
</div>




```python
test_data.head()
```




<div style="overflow-x:auto;">
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>PassengerId</th>
      <th>Pclass</th>
      <th>Name</th>
      <th>Sex</th>
      <th>Age</th>
      <th>SibSp</th>
      <th>Parch</th>
      <th>Ticket</th>
      <th>Fare</th>
      <th>Cabin</th>
      <th>Embarked</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>892</td>
      <td>3</td>
      <td>Kelly, Mr. James</td>
      <td>male</td>
      <td>34.5</td>
      <td>0</td>
      <td>0</td>
      <td>330911</td>
      <td>7.8292</td>
      <td>NaN</td>
      <td>Q</td>
    </tr>
    <tr>
      <th>1</th>
      <td>893</td>
      <td>3</td>
      <td>Wilkes, Mrs. James (Ellen Needs)</td>
      <td>female</td>
      <td>47.0</td>
      <td>1</td>
      <td>0</td>
      <td>363272</td>
      <td>7.0000</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
    <tr>
      <th>2</th>
      <td>894</td>
      <td>2</td>
      <td>Myles, Mr. Thomas Francis</td>
      <td>male</td>
      <td>62.0</td>
      <td>0</td>
      <td>0</td>
      <td>240276</td>
      <td>9.6875</td>
      <td>NaN</td>
      <td>Q</td>
    </tr>
    <tr>
      <th>3</th>
      <td>895</td>
      <td>3</td>
      <td>Wirz, Mr. Albert</td>
      <td>male</td>
      <td>27.0</td>
      <td>0</td>
      <td>0</td>
      <td>315154</td>
      <td>8.6625</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
    <tr>
      <th>4</th>
      <td>896</td>
      <td>3</td>
      <td>Hirvonen, Mrs. Alexander (Helga E Lindqvist)</td>
      <td>female</td>
      <td>22.0</td>
      <td>1</td>
      <td>1</td>
      <td>3101298</td>
      <td>12.2875</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
  </tbody>
</table>
</div>



## Prepare the data
This step aims to prepare the data for use in machine learning training. It involves cleaning up the data, understanding its structure and attributes, studying possible correlations between attributes, and visualizing the data to extract human-level insight on its properties, distribution, range, and overall usefulness [[3]](#ref3).

### Data Overview 


```python
train_data.info()
print("-" * 40)
test_data.info()
```

    <class 'pandas.core.frame.DataFrame'>
    RangeIndex: 891 entries, 0 to 890
    Data columns (total 12 columns):
     #   Column       Non-Null Count  Dtype  
    ---  ------       --------------  -----  
     0   PassengerId  891 non-null    int64  
     1   Survived     891 non-null    int64  
     2   Pclass       891 non-null    int64  
     3   Name         891 non-null    object 
     4   Sex          891 non-null    object 
     5   Age          714 non-null    float64
     6   SibSp        891 non-null    int64  
     7   Parch        891 non-null    int64  
     8   Ticket       891 non-null    object 
     9   Fare         891 non-null    float64
     10  Cabin        204 non-null    object 
     11  Embarked     889 non-null    object 
    dtypes: float64(2), int64(5), object(5)
    memory usage: 83.7+ KB
    ----------------------------------------
    <class 'pandas.core.frame.DataFrame'>
    RangeIndex: 418 entries, 0 to 417
    Data columns (total 11 columns):
     #   Column       Non-Null Count  Dtype  
    ---  ------       --------------  -----  
     0   PassengerId  418 non-null    int64  
     1   Pclass       418 non-null    int64  
     2   Name         418 non-null    object 
     3   Sex          418 non-null    object 
     4   Age          332 non-null    float64
     5   SibSp        418 non-null    int64  
     6   Parch        418 non-null    int64  
     7   Ticket       418 non-null    object 
     8   Fare         417 non-null    float64
     9   Cabin        91 non-null     object 
     10  Embarked     418 non-null    object 
    dtypes: float64(2), int64(4), object(5)
    memory usage: 36.0+ KB


**Observations**

1. The data contains 11 features. The details of these features are described on the [Kaggle data pape here](https://www.kaggle.com/c/titanic/data). 
   - Categorical: Sex and Embarked,
   - Orinial: Pclass,
   - Numerical: Age and Fare (continous), SibSp and Parch (discret),
   - Mixed: Cabin (alphanumeric).
2. There are missing values in Age, Cabin, Embarked and Fare.

### Primary data analysis and visualization


```python
# Overall Surival Rate
train_data['Survived'].value_counts().plot.pie(autopct = '%1.2f%%');
```


    
![png](/assets/img/posts/Titanic.markdown_files/Titanic.markdown_12_0.png)  


#### Sex  


```python
# Sex  
train_data[['Sex','Survived']].groupby(['Sex']).mean().plot.bar();
```


    
![png](/assets/img/posts/Titanic.markdown_files/Titanic.markdown_14_0.png)
    


**Observation**: Female passengers had higher survival chance. 

#### Class 


```python
# Class  
train_data[['Pclass', 'Survived']].groupby('Pclass').mean().plot.bar();
```


    
![png](/assets/img/posts/Titanic.markdown_files/Titanic.markdown_17_0.png)
    


**Observation**: Surival rate Class 1 > Class 2 > Class 3

#### Family size 


```python
# Family Size 
train_data['FamilySize'] = train_data['Parch'] + train_data['SibSp'] + 1 
test_data['FamilySize'] = test_data['Parch'] + test_data['SibSp'] + 1 

sns.barplot(data=train_data, x='FamilySize', y='Survived');
```


    
![png](/assets/img/posts/Titanic.markdown_files/Titanic.markdown_20_0.png)
    


**Observation:** Passengers with small family size (2-4) were more likely to survive. 

Therefore, the passengers are grouped into 3 groups according the size of family: singleton, SmallFamily (family size 2-4) and LargeFamily (family size larger than 4).


```python
# Feature engineering
train_data['Singleton'] = train_data['FamilySize'].map(lambda s: 1 if s == 1 else 0)
train_data['SmallFamily'] = train_data['FamilySize'].map(lambda s: 1 if 2<= s <= 4 else 0)
train_data['LargeFamily'] = train_data['FamilySize'].map(lambda s: 1 if s>=5 else 0)

test_data['Singleton'] = test_data['FamilySize'].map(lambda s: 1 if s == 1 else 0)
test_data['SmallFamily'] = test_data['FamilySize'].map(lambda s: 1 if 2<= s <= 4 else 0)
test_data['LargeFamily'] = test_data['FamilySize'].map(lambda s: 1 if s>=5 else 0)
```

#### Age 


```python
# Age & Survival Rate 
age_data = train_data[train_data['Age'].notna()][['Age', 'Survived']]
sns.histplot(age_data['Age']);
```


    
![png](/assets/img/posts/Titanic.markdown_files/Titanic.markdown_24_0.png)
    



```python
ageFacet=sns.FacetGrid(train_data,hue='Survived',aspect=3);
ageFacet.map(sns.kdeplot,'Age',shade=True);
ageFacet.set(xlim=(0,train_data['Age'].max()));
ageFacet.add_legend();
```


    
![png](/assets/img/posts/Titanic.markdown_files/Titanic.markdown_25_0.png)
    


**Observation:** Passengers aged under 10 were more likely to survive.

#### Fare 


```python
# Fare & Survival Rate
fareFacet=sns.FacetGrid(train_data,hue='Survived',aspect=3);
fareFacet.map(sns.kdeplot,'Fare',shade=True);
fareFacet.set(xlim=(0,150));
fareFacet.add_legend();
```


    
![png](/assets/img/posts/Titanic.markdown_files/Titanic.markdown_28_0.png)
    


**Observation:** Low survival rate for fare < 20.

#### Embarked port 


```python
# Embarked & Survival Rate
sns.barplot(data=train_data,x='Embarked',y='Survived');
```


    
![png](/assets/img/posts/Titanic.markdown_files/Titanic.markdown_31_0.png)
    


**Observations:** Passengers embarked from port C were more likely to survive.

#### Name (Title) 

The titles of the passengers can be extracted from their names. Passengers from different social classes may have different survival chance.


```python
# Extract titles
train_data['Title'] = train_data.Name.str.extract(' ([A-Za-z]+)\.', expand=False)
test_data['Title'] = test_data.Name.str.extract(' ([A-Za-z]+)\.', expand=False)
train_data['Title'].value_counts()
```




    Mr          517
    Miss        182
    Mrs         125
    Master       40
    Dr            7
    Rev           6
    Mlle          2
    Major         2
    Col           2
    Ms            1
    Don           1
    Lady          1
    Mme           1
    Sir           1
    Countess      1
    Capt          1
    Jonkheer      1
    Name: Title, dtype: int64




```python
# Group the passengers into 6 groups by their titles.
Title_Dictionary = {
                        "Capt":       "Officer",
                        "Col":        "Officer",
                        "Major":      "Officer",
                        "Jonkheer":   "Royalty",
                        "Don":        "Royalty",
                        "Sir" :       "Royalty",
                        "Dr":         "Officer",
                        "Rev":        "Officer",
                        "Countess":   "Royalty",
                        "Dona":       "Royalty",
                        "Mme":        "Mrs",
                        "Mlle":       "Miss",
                        "Ms":         "Mrs",
                        "Mr" :        "Mr",
                        "Mrs" :       "Mrs",
                        "Miss" :      "Miss",
                        "Master" :    "Master",
                        "Lady" :      "Royalty"
                        }
train_data['Title']=train_data['Title'].map(Title_Dictionary)
test_data['Title']=test_data['Title'].map(Title_Dictionary)
train_data['Title'].value_counts()
```




    Mr         517
    Miss       184
    Mrs        127
    Master      40
    Officer     18
    Royalty      5
    Name: Title, dtype: int64




```python
sns.barplot(data=train_data, x='Title', y='Survived');
```


    
![png](/assets/img/posts/Titanic.markdown_files/Titanic.markdown_36_0.png)
    


**Observation:** Passengers with "Mr" and "Officer" titles had low survival chance.

#### Cabin 
The Cabin information can tell which decks the passengers were resided, which may influence the survival rate. 
The Cabin variables have many missing values. THe missing values will be replaced by "Unknown".


```python
train_data['Cabin'] = train_data['Cabin'].fillna('Unknown')
test_data['Cabin'] = test_data['Cabin'].fillna('Unknown')
```


```python
# Cabin 
train_data['Deck']=train_data['Cabin'].map(lambda x:x[0])
test_data['Deck']=test_data['Cabin'].map(lambda x:x[0])
sns.barplot(data=train_data, x='Deck', y='Survived');
```


    
![png](/assets/img/posts/Titanic.markdown_files/Titanic.markdown_40_0.png)
    


**Observation:** Passengers in Deck B, D, E were more likely to survive.

### Data pre-processing

#### Combine all data 


```python
full_data = pd.concat([train_data, test_data], axis=0)
```

#### Fill the missing values

##### Embarked


```python
# Embarked
full_data[full_data['Embarked'].isnull()]
```




<div style="overflow-x:auto;">
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>PassengerId</th>
      <th>Survived</th>
      <th>Pclass</th>
      <th>Name</th>
      <th>Sex</th>
      <th>Age</th>
      <th>SibSp</th>
      <th>Parch</th>
      <th>Ticket</th>
      <th>Fare</th>
      <th>Cabin</th>
      <th>Embarked</th>
      <th>FamilySize</th>
      <th>Singleton</th>
      <th>SmallFamily</th>
      <th>LargeFamily</th>
      <th>Title</th>
      <th>Deck</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>61</th>
      <td>62</td>
      <td>1.0</td>
      <td>1</td>
      <td>Icard, Miss. Amelie</td>
      <td>female</td>
      <td>38.0</td>
      <td>0</td>
      <td>0</td>
      <td>113572</td>
      <td>80.0</td>
      <td>B28</td>
      <td>NaN</td>
      <td>1</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>Miss</td>
      <td>B</td>
    </tr>
    <tr>
      <th>829</th>
      <td>830</td>
      <td>1.0</td>
      <td>1</td>
      <td>Stone, Mrs. George Nelson (Martha Evelyn)</td>
      <td>female</td>
      <td>62.0</td>
      <td>0</td>
      <td>0</td>
      <td>113572</td>
      <td>80.0</td>
      <td>B28</td>
      <td>NaN</td>
      <td>1</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>Mrs</td>
      <td>B</td>
    </tr>
  </tbody>
</table>
</div>




```python
full_data['Embarked'].value_counts()
```




    S    914
    C    270
    Q    123
    Name: Embarked, dtype: int64



Fill the missing value of the Embarked feature with the most frequent value.


```python
full_data['Embarked'] = full_data['Embarked'].fillna('S')
```

##### Fare


```python
# Fare 
full_data[full_data['Fare'].isnull()]
```




<div style="overflow-x:auto;">
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>PassengerId</th>
      <th>Survived</th>
      <th>Pclass</th>
      <th>Name</th>
      <th>Sex</th>
      <th>Age</th>
      <th>SibSp</th>
      <th>Parch</th>
      <th>Ticket</th>
      <th>Fare</th>
      <th>Cabin</th>
      <th>Embarked</th>
      <th>FamilySize</th>
      <th>Singleton</th>
      <th>SmallFamily</th>
      <th>LargeFamily</th>
      <th>Title</th>
      <th>Deck</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>152</th>
      <td>1044</td>
      <td>NaN</td>
      <td>3</td>
      <td>Storey, Mr. Thomas</td>
      <td>male</td>
      <td>60.5</td>
      <td>0</td>
      <td>0</td>
      <td>3701</td>
      <td>NaN</td>
      <td>Unknown</td>
      <td>S</td>
      <td>1</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>Mr</td>
      <td>U</td>
    </tr>
  </tbody>
</table>
</div>



Fill the missing value of the Fare feature with the mean value.


```python
full_data['Fare']=full_data['Fare'].fillna(full_data[(full_data['Pclass']==3)&(full_data['Embarked']=='S')&(full_data['Cabin']=='Unknown')]['Fare'].mean())
```

##### Age 
The Random Forest algorithm is used to fill the missing of the Age feature. 


```python
AgePre = full_data[['Age','Pclass','Title','FamilySize','Sex']]
AgePre = pd.get_dummies(AgePre)
AgePre.head()
```




<div style="overflow-x:auto;">
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Age</th>
      <th>Pclass</th>
      <th>FamilySize</th>
      <th>Title_Master</th>
      <th>Title_Miss</th>
      <th>Title_Mr</th>
      <th>Title_Mrs</th>
      <th>Title_Officer</th>
      <th>Title_Royalty</th>
      <th>Sex_female</th>
      <th>Sex_male</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>22.0</td>
      <td>3</td>
      <td>2</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>38.0</td>
      <td>1</td>
      <td>2</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>26.0</td>
      <td>3</td>
      <td>1</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>35.0</td>
      <td>1</td>
      <td>2</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>35.0</td>
      <td>3</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
    </tr>
  </tbody>
</table>
</div>




```python
# Split the dateset
AgeKnown=AgePre[AgePre['Age'].notnull()]
AgeUnKnown=AgePre[AgePre['Age'].isnull()]

AgeKnown_X=AgeKnown.drop(['Age'],axis=1)
AgeKnown_y=AgeKnown['Age']

AgeUnKnown_X=AgeUnKnown.drop(['Age'],axis=1)

# Setup the random forest model
from sklearn.ensemble import RandomForestRegressor
rfr=RandomForestRegressor(random_state=None,n_estimators=500,n_jobs=-1)
rfr.fit(AgeKnown_X,AgeKnown_y)

# Model evaluation
rfr.score(AgeKnown_X,AgeKnown_y)
```




    0.4911278076281459




```python
# Predict age
AgeUnKnown_y=rfr.predict(AgeUnKnown_X)
# Fill the mssing value
full_data.loc[full_data['Age'].isnull(),['Age']]=AgeUnKnown_y
# Create featuer IsChild (less than 10 years old)
full_data['IsChild'] = full_data['Age'].map(lambda s: 1 if s <= 10 else 0)
full_data.info() # no missing values now (except Survived)
```

    <class 'pandas.core.frame.DataFrame'>
    Int64Index: 1309 entries, 0 to 417
    Data columns (total 19 columns):
     #   Column       Non-Null Count  Dtype  
    ---  ------       --------------  -----  
     0   PassengerId  1309 non-null   int64  
     1   Survived     891 non-null    float64
     2   Pclass       1309 non-null   int64  
     3   Name         1309 non-null   object 
     4   Sex          1309 non-null   object 
     5   Age          1309 non-null   float64
     6   SibSp        1309 non-null   int64  
     7   Parch        1309 non-null   int64  
     8   Ticket       1309 non-null   object 
     9   Fare         1309 non-null   float64
     10  Cabin        1309 non-null   object 
     11  Embarked     1309 non-null   object 
     12  FamilySize   1309 non-null   int64  
     13  Singleton    1309 non-null   int64  
     14  SmallFamily  1309 non-null   int64  
     15  LargeFamily  1309 non-null   int64  
     16  Title        1309 non-null   object 
     17  Deck         1309 non-null   object 
     18  IsChild      1309 non-null   int64  
    dtypes: float64(3), int64(9), object(7)
    memory usage: 204.5+ KB



```python
full_data.head()
```




<div style="overflow-x:auto;">
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>PassengerId</th>
      <th>Survived</th>
      <th>Pclass</th>
      <th>Name</th>
      <th>Sex</th>
      <th>Age</th>
      <th>SibSp</th>
      <th>Parch</th>
      <th>Ticket</th>
      <th>Fare</th>
      <th>Cabin</th>
      <th>Embarked</th>
      <th>FamilySize</th>
      <th>Singleton</th>
      <th>SmallFamily</th>
      <th>LargeFamily</th>
      <th>Title</th>
      <th>Deck</th>
      <th>IsChild</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>0.0</td>
      <td>3</td>
      <td>Braund, Mr. Owen Harris</td>
      <td>male</td>
      <td>22.0</td>
      <td>1</td>
      <td>0</td>
      <td>A/5 21171</td>
      <td>7.2500</td>
      <td>Unknown</td>
      <td>S</td>
      <td>2</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>Mr</td>
      <td>U</td>
      <td>0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>1.0</td>
      <td>1</td>
      <td>Cumings, Mrs. John Bradley (Florence Briggs Th...</td>
      <td>female</td>
      <td>38.0</td>
      <td>1</td>
      <td>0</td>
      <td>PC 17599</td>
      <td>71.2833</td>
      <td>C85</td>
      <td>C</td>
      <td>2</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>Mrs</td>
      <td>C</td>
      <td>0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3</td>
      <td>1.0</td>
      <td>3</td>
      <td>Heikkinen, Miss. Laina</td>
      <td>female</td>
      <td>26.0</td>
      <td>0</td>
      <td>0</td>
      <td>STON/O2. 3101282</td>
      <td>7.9250</td>
      <td>Unknown</td>
      <td>S</td>
      <td>1</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>Miss</td>
      <td>U</td>
      <td>0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>4</td>
      <td>1.0</td>
      <td>1</td>
      <td>Futrelle, Mrs. Jacques Heath (Lily May Peel)</td>
      <td>female</td>
      <td>35.0</td>
      <td>1</td>
      <td>0</td>
      <td>113803</td>
      <td>53.1000</td>
      <td>C123</td>
      <td>S</td>
      <td>2</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>Mrs</td>
      <td>C</td>
      <td>0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5</td>
      <td>0.0</td>
      <td>3</td>
      <td>Allen, Mr. William Henry</td>
      <td>male</td>
      <td>35.0</td>
      <td>0</td>
      <td>0</td>
      <td>373450</td>
      <td>8.0500</td>
      <td>Unknown</td>
      <td>S</td>
      <td>1</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>Mr</td>
      <td>U</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
</div>



#### Select the features


```python
# Remove the less revelant features
fullSel=full_data.drop(['Cabin','Name','Ticket','PassengerId'],axis=1)
# Check the correlations of the features
corrDf=pd.DataFrame()
corrDf=fullSel.corr()
corrDf['Survived'].sort_values(ascending=True)
```




    Pclass        -0.338481
    Singleton     -0.203367
    LargeFamily   -0.125147
    Age           -0.065783
    SibSp         -0.035322
    FamilySize     0.016639
    Parch          0.081629
    IsChild        0.125678
    Fare           0.257307
    SmallFamily    0.279855
    Survived       1.000000
    Name: Survived, dtype: float64




```python
# Heatmap
plt.figure(figsize=(8,8));
sns.heatmap(fullSel[['Survived','Age','Embarked','Fare','Parch','Pclass',
                    'Sex','SibSp','Title','Singleton','SmallFamily','LargeFamily','FamilySize','IsChild','Deck']].corr(),cmap='BrBG',annot=True,
           linewidths=.5);
plt.xticks(rotation=45);
```


    
![png](/assets/img/posts/Titanic.markdown_files/Titanic.markdown_62_0.png)
    



```python
fullSel=fullSel.drop(['SibSp','Parch','FamilySize','Age'],axis=1)
```

#### One-hot encoding


```python
# One-hot encoding
fullSel=pd.get_dummies(fullSel)
PclassDf=pd.get_dummies(full_data['Pclass'],prefix='Pclass')
```


```python
PclassDf.head()
```




<div style="overflow-x:auto;">
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Pclass_1</th>
      <th>Pclass_2</th>
      <th>Pclass_3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0</td>
      <td>0</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0</td>
      <td>0</td>
      <td>1</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0</td>
      <td>0</td>
      <td>1</td>
    </tr>
  </tbody>
</table>
</div>




```python
fullSel = pd.concat([fullSel, PclassDf], axis=1)
```


```python
fullSel.drop('Pclass', axis=1, inplace=True)
```


```python
fullSel.head()
```




<div style="overflow-x:auto;">
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Survived</th>
      <th>Fare</th>
      <th>Singleton</th>
      <th>SmallFamily</th>
      <th>LargeFamily</th>
      <th>IsChild</th>
      <th>Sex_female</th>
      <th>Sex_male</th>
      <th>Embarked_C</th>
      <th>Embarked_Q</th>
      <th>...</th>
      <th>Deck_C</th>
      <th>Deck_D</th>
      <th>Deck_E</th>
      <th>Deck_F</th>
      <th>Deck_G</th>
      <th>Deck_T</th>
      <th>Deck_U</th>
      <th>Pclass_1</th>
      <th>Pclass_2</th>
      <th>Pclass_3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0.0</td>
      <td>7.2500</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>...</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1.0</td>
      <td>71.2833</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>...</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1.0</td>
      <td>7.9250</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>...</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1.0</td>
      <td>53.1000</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>...</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0.0</td>
      <td>8.0500</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>...</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
    </tr>
  </tbody>
</table>
<p>5 rows × 29 columns</p>
</div>



#### Normalization


```python
fullSel[fullSel.columns] = fullSel[fullSel.columns].apply(lambda x: x/x.max(), axis=0)
```


```python
fullSel.head()
```




<div style="overflow-x:auto;">
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Survived</th>
      <th>Fare</th>
      <th>Singleton</th>
      <th>SmallFamily</th>
      <th>LargeFamily</th>
      <th>IsChild</th>
      <th>Sex_female</th>
      <th>Sex_male</th>
      <th>Embarked_C</th>
      <th>Embarked_Q</th>
      <th>...</th>
      <th>Deck_C</th>
      <th>Deck_D</th>
      <th>Deck_E</th>
      <th>Deck_F</th>
      <th>Deck_G</th>
      <th>Deck_T</th>
      <th>Deck_U</th>
      <th>Pclass_1</th>
      <th>Pclass_2</th>
      <th>Pclass_3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0.0</td>
      <td>0.014151</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1.0</td>
      <td>0.139136</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>...</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1.0</td>
      <td>0.015469</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1.0</td>
      <td>0.103644</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>...</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0.0</td>
      <td>0.015713</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>...</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
  </tbody>
</table>
<p>5 rows × 29 columns</p>
</div>




```python
fullSel.to_csv('combined_data.csv', index=False)
```

### Split the dataset


```python
train = fullSel[fullSel['Survived'].notnull()]
test = fullSel[fullSel['Survived'].isnull()]
targets = train['Survived']
train.drop('Survived', axis=1, inplace=True)
test.drop('Survived', axis=1, inplace=True)

X_train,X_val,Y_train,Y_val = train_test_split(train,targets,test_size = 0.2,random_state = 42)
```

## Define the model
A neural network model with 3 layers are chosen. The model is implemented using Keras.


```python
x = X_train
y = Y_train
L1=20
L2=20
L3=5
model = tf.keras.Sequential()
model.add(tf.keras.layers.Dense(L1,input_shape=(X_train.shape[1],),kernel_regularizer='l2', activation='relu'))
model.add(tf.keras.layers.Dense(L2,kernel_regularizer='l2', activation='relu'))
model.add(tf.keras.layers.Dense(L3,kernel_regularizer='l2', activation='relu'))
model.add(tf.keras.layers.Dense(1,kernel_regularizer='l2', activation='sigmoid'))
model.compile(optimizer='adam',loss='binary_crossentropy',metrics=['accuracy'])
```

## Train and fine-tune model


```python
epoch = 50
history = model.fit(x,y,epochs=epoch,batch_size=32,verbose=0)
preds = model.evaluate(x=X_val, y=Y_val)
print ("Loss = " + str(preds[0]))
print ("Test Accuracy = " + str(preds[1]))
print ("Training Accuracy = " + str(history.history['accuracy'][-1]))
```
 
Output:

```
Loss = 0.5216637253761292
Test Accuracy = 0.826815664768219
Training Accuracy = 0.8300561904907227
```
**Observation:** Test accuracy and training accuracy are close, indicating that the model is not over-fitting. 

Retrain the model with all training data. 

```python
history = model.fit(train,targets,epochs=epoch,batch_size=32,verbose=0)
preds = model.evaluate(x=X_val, y=Y_val)
print ("Loss = " + str(preds[0]))
print ("Accuracy = " + str(history.history['accuracy'][-1]))
```

Output:
```
Loss = 0.49221670627593994
Accuracy = 0.8316498398780823
```

## Test and deploy model


```python
l = model.predict(test)
```


```python
survived = [1 if x > 0.5 else 0 for x in l]
#original_test_data = pd.read_csv('/kaggle/input/titanic/test.csv')
original_test_data = pd.read_csv('./Dataset/test.csv')
submission = pd.DataFrame({
    'PassengerId': original_test_data['PassengerId'],
    'Survived':  survived
})

submission.to_csv('titanic-nn.csv', index=False)
```

Submission of this result on Kaggle results in a public score of 0.77751,  ranking 4428th out of 16823 at the time of writing.

## References 
This tutorial has been created based on great work done solving the Titanic competition and machine learning.
1. [https://zhuanlan.zhihu.com/p/50194676](https://zhuanlan.zhihu.com/p/50194676)
2. [https://www.kaggle.com/startupsci/titanic-data-science-solutions](https://www.kaggle.com/startupsci/titanic-data-science-solutions)
3. [https://www.kdnuggets.com/2020/09/mathworks-deep-learning-workflow.html](https://www.kdnuggets.com/2020/09/mathworks-deep-learning-workflow.html)
