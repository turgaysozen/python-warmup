def factoriel(x):
    if x == 0:
        return 1
    else:
        fac = factoriel(x - 1) * x
    return fac


print(factoriel(5))
