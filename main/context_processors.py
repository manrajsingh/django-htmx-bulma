def ui_config(request):
    base_template = '_base.html'

    if request.htmx:
        base_template = '_base_partial.html'
    else:
        base_template = '_base.html'
    
    return { 
        'base_template': base_template, 
    }