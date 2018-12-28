from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User

from .models import Profile
from files.models import Userpic

class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False
    verbose_name_plural = 'Profile'
    fk_name = 'user'

class UserpicInline(admin.StackedInline):
    model = Userpic
    verbose_name_plural = 'User avatars'

class CustomUserAdmin(UserAdmin):
    inlines = (ProfileInline, UserpicInline)
    list_display = (
      'username', 'email', 'is_staff', 'get_first_name',
      'get_last_name',
    )
    list_select_related = ('profile',)

    def get_inline_instances(self, request, obj=None):
        if not obj:
            return list()
        return super(CustomUserAdmin, self).get_inline_instances(request, obj)

    def get_last_name(self, instance):
        return instance.profile.last_name
    get_last_name.short_description = 'Last name'

    def get_first_name(self, instance):
        return instance.profile.first_name
    get_first_name.short_description = 'First name'

    def get_inline_instances(self, request, obj=None):
        if not obj:
            return list()
        return super(CustomUserAdmin, self).get_inline_instances(request, obj)

admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)