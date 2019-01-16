from .views import TradeRequestViewSet, TradeRequestReadOnlyViewSet
from rest_framework_nested import routers

router = routers.SimpleRouter()
router.register(r'trade_requests', TradeRequestReadOnlyViewSet, base_name='trade-requests')

urlpatterns = router.urls
