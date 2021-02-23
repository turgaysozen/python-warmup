def args_func(*args):
    print(args)


def kwarg_func(**param):
    print(param)


args_func('Turgay', 29, 'SE', 'Istanbul')
kwarg_func(val1='Turgay', val2=20, val3=True, val4=15.2)
