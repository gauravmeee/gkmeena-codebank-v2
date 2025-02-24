# Python Pandas Tutorial

```
pip install pandas 
``` 
```
pip install --upgrade pandas
```
```
pip inall jupyter
```
note:- Jupyter is not necessary, but it provide a powerful and convenient environment for data analysis tasks, making it easier to visualize data, iterate on code, and document your analysis steps.


```py
import numpy as np
import pandas as pd
```

 `DataFrame` Make and store dictionary in excel like table:
```py
df = pd.DataFrame(dict1)
```

export to csv, csv = comma seperated values
```py
df.to_csv('friend')
```

```py
df.to_csv('friend', index=False)
```
```py
df.head(2)
```
```py
df.tail(3)
```
```py
df.describe()
```
assigning 'df' datafram, but with different data
```py
harry = df.read_csv('harry.csv')
```
```py
harry
```
```py
harry['speed']
harry['speed'][0]
harry['speed'][0] = 50 
```
```py
harry.to_csv
```
```py
harry.index = ['first', 'second', 'third', 'fourth']
```
```py
```
```py
```
```py
```
.

.

.

Pandas has two types of data structures:

Series - One Dimensional

Dataframe - tabular spreadhsheet like structure

```py
ser = pd.Series(np.random.rand)
#np = numPy
```

```py
type(ser)
```
```py

```
```py

```
```py

```
```py

```
```py

```
```py

```
> # 40:00/1:05:00  [Python Pandas Tutorial in Hindi](https://www.youtube.com/watch?v=RhEjmHeDNoA&t=1480s&pp=ygUQcGFuZGFzIHR1dG9yaWFsIA%3D%3D) by CodeWithHarry