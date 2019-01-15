from django.contrib import admin

from django.contrib.auth.models import User
from .models import TradeRequest

class TradeRequestAdmin(admin.ModelAdmin):
    model = TradeRequest
    list_display = ('id', 'created_by', 'target',)
    list_display_links = ('created_by', 'target',)

admin.site.register(TradeRequest, TradeRequestAdmin)