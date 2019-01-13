from django.contrib import admin

from .models import Userpic

class UserpicAdmin(admin.ModelAdmin):
    model = Userpic
    list_display = ('id', 'image',  'owner', 'created_at', 'updated_at',)
    list_display_links = ('id', 'image', 'owner', )

admin.site.register(Userpic, UserpicAdmin)
