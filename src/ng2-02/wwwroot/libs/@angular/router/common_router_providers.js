"use strict";
var common_1 = require('@angular/common');
var core_1 = require('@angular/core');
var router_1 = require('./router');
var router_outlet_map_1 = require('./router_outlet_map');
var router_state_1 = require('./router_state');
var url_serializer_1 = require('./url_serializer');
exports.ROUTER_CONFIG = new core_1.OpaqueToken('ROUTER_CONFIG');
exports.ROUTER_OPTIONS = new core_1.OpaqueToken('ROUTER_OPTIONS');
function setupRouter(ref, resolver, urlSerializer, outletMap, location, injector, config, opts) {
    if (ref.componentTypes.length == 0) {
        throw new Error('Bootstrap at least one component before injecting Router.');
    }
    var componentType = ref.componentTypes[0];
    var r = new router_1.Router(componentType, resolver, urlSerializer, outletMap, location, injector, config);
    ref.registerDisposeListener(function () { return r.dispose(); });
    if (opts.enableTracing) {
        r.events.subscribe(function (e) {
            console.group("Router Event: " + e.constructor.name);
            console.log(e.toString());
            console.log(e);
            console.groupEnd();
        });
    }
    return r;
}
exports.setupRouter = setupRouter;
function setupRouterInitializer(injector) {
    setTimeout(function () {
        var appRef = injector.get(core_1.ApplicationRef);
        if (appRef.componentTypes.length == 0) {
            appRef.registerBootstrapListener(function () { injector.get(router_1.Router).initialNavigation(); });
        }
        else {
            injector.get(router_1.Router).initialNavigation();
        }
    }, 0);
    return function () { return null; };
}
exports.setupRouterInitializer = setupRouterInitializer;
function provideRouter(_config, _opts) {
    return [
        { provide: exports.ROUTER_CONFIG, useValue: _config }, { provide: exports.ROUTER_OPTIONS, useValue: _opts },
        common_1.Location, { provide: common_1.LocationStrategy, useClass: common_1.PathLocationStrategy },
        { provide: url_serializer_1.UrlSerializer, useClass: url_serializer_1.DefaultUrlSerializer },
        {
            provide: router_1.Router,
            useFactory: setupRouter,
            deps: [
                core_1.ApplicationRef, core_1.ComponentResolver, url_serializer_1.UrlSerializer, router_outlet_map_1.RouterOutletMap, common_1.Location, core_1.Injector,
                exports.ROUTER_CONFIG, exports.ROUTER_OPTIONS
            ]
        },
        router_outlet_map_1.RouterOutletMap,
        { provide: router_state_1.ActivatedRoute, useFactory: function (r) { return r.routerState.root; }, deps: [router_1.Router] },
        { provide: core_1.APP_INITIALIZER, multi: true, useFactory: setupRouterInitializer, deps: [core_1.Injector] }
    ];
}
exports.provideRouter = provideRouter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uX3JvdXRlcl9wcm92aWRlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY29tbW9uX3JvdXRlcl9wcm92aWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHVCQUErRCxpQkFBaUIsQ0FBQyxDQUFBO0FBQ2pGLHFCQUF3RixlQUFlLENBQUMsQ0FBQTtBQUd4Ryx1QkFBcUIsVUFBVSxDQUFDLENBQUE7QUFDaEMsa0NBQThCLHFCQUFxQixDQUFDLENBQUE7QUFDcEQsNkJBQTZCLGdCQUFnQixDQUFDLENBQUE7QUFDOUMsK0JBQWtELGtCQUFrQixDQUFDLENBQUE7QUFFeEQscUJBQWEsR0FBRyxJQUFJLGtCQUFXLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDakQsc0JBQWMsR0FBRyxJQUFJLGtCQUFXLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUloRSxxQkFDSSxHQUFtQixFQUFFLFFBQTJCLEVBQUUsYUFBNEIsRUFDOUUsU0FBMEIsRUFBRSxRQUFrQixFQUFFLFFBQWtCLEVBQUUsTUFBb0IsRUFDeEYsSUFBa0I7SUFDcEIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQyxNQUFNLElBQUksS0FBSyxDQUFDLDJEQUEyRCxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUNELElBQU0sYUFBYSxHQUFHLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUMsSUFBTSxDQUFDLEdBQ0gsSUFBSSxlQUFNLENBQUMsYUFBYSxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDOUYsR0FBRyxDQUFDLHVCQUF1QixDQUFDLGNBQU0sT0FBQSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQVgsQ0FBVyxDQUFDLENBQUM7SUFFL0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDdkIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBQSxDQUFDO1lBQ2xCLE9BQU8sQ0FBQyxLQUFLLENBQUMsbUJBQXVCLENBQUMsQ0FBQyxXQUFZLENBQUMsSUFBTSxDQUFDLENBQUM7WUFDNUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2YsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDWCxDQUFDO0FBdEJlLG1CQUFXLGNBc0IxQixDQUFBO0FBRUQsZ0NBQXVDLFFBQWtCO0lBSXZELFVBQVUsQ0FBQztRQUNULElBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMscUJBQWMsQ0FBQyxDQUFDO1FBQzVDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEMsTUFBTSxDQUFDLHlCQUF5QixDQUFDLGNBQVEsUUFBUSxDQUFDLEdBQUcsQ0FBQyxlQUFNLENBQUMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEYsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sUUFBUSxDQUFDLEdBQUcsQ0FBQyxlQUFNLENBQUMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzNDLENBQUM7SUFDSCxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDTixNQUFNLENBQUMsY0FBVyxPQUFBLElBQUksRUFBSixDQUFJLENBQUM7QUFDekIsQ0FBQztBQWJlLDhCQUFzQix5QkFhckMsQ0FBQTtBQW9CRCx1QkFBOEIsT0FBcUIsRUFBRSxLQUFtQjtJQUN0RSxNQUFNLENBQUM7UUFDTCxFQUFDLE9BQU8sRUFBRSxxQkFBYSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBRSxzQkFBYyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUM7UUFDdkYsaUJBQVEsRUFBRSxFQUFDLE9BQU8sRUFBRSx5QkFBZ0IsRUFBRSxRQUFRLEVBQUUsNkJBQW9CLEVBQUM7UUFDckUsRUFBQyxPQUFPLEVBQUUsOEJBQWEsRUFBRSxRQUFRLEVBQUUscUNBQW9CLEVBQUM7UUFFeEQ7WUFDRSxPQUFPLEVBQUUsZUFBTTtZQUNmLFVBQVUsRUFBRSxXQUFXO1lBQ3ZCLElBQUksRUFBRTtnQkFDSixxQkFBYyxFQUFFLHdCQUFpQixFQUFFLDhCQUFhLEVBQUUsbUNBQWUsRUFBRSxpQkFBUSxFQUFFLGVBQVE7Z0JBQ3JGLHFCQUFhLEVBQUUsc0JBQWM7YUFDOUI7U0FDRjtRQUVELG1DQUFlO1FBQ2YsRUFBQyxPQUFPLEVBQUUsNkJBQWMsRUFBRSxVQUFVLEVBQUUsVUFBQyxDQUFTLElBQUssT0FBQSxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksRUFBbEIsQ0FBa0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxlQUFNLENBQUMsRUFBQztRQUd4RixFQUFDLE9BQU8sRUFBRSxzQkFBZSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLHNCQUFzQixFQUFFLElBQUksRUFBRSxDQUFDLGVBQVEsQ0FBQyxFQUFDO0tBQzlGLENBQUM7QUFDSixDQUFDO0FBckJlLHFCQUFhLGdCQXFCNUIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TG9jYXRpb24sIExvY2F0aW9uU3RyYXRlZ3ksIFBhdGhMb2NhdGlvblN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtBUFBfSU5JVElBTElaRVIsIEFwcGxpY2F0aW9uUmVmLCBDb21wb25lbnRSZXNvbHZlciwgSW5qZWN0b3IsIE9wYXF1ZVRva2VufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtSb3V0ZXJDb25maWd9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7Um91dGVyfSBmcm9tICcuL3JvdXRlcic7XG5pbXBvcnQge1JvdXRlck91dGxldE1hcH0gZnJvbSAnLi9yb3V0ZXJfb3V0bGV0X21hcCc7XG5pbXBvcnQge0FjdGl2YXRlZFJvdXRlfSBmcm9tICcuL3JvdXRlcl9zdGF0ZSc7XG5pbXBvcnQge0RlZmF1bHRVcmxTZXJpYWxpemVyLCBVcmxTZXJpYWxpemVyfSBmcm9tICcuL3VybF9zZXJpYWxpemVyJztcblxuZXhwb3J0IGNvbnN0IFJPVVRFUl9DT05GSUcgPSBuZXcgT3BhcXVlVG9rZW4oJ1JPVVRFUl9DT05GSUcnKTtcbmV4cG9ydCBjb25zdCBST1VURVJfT1BUSU9OUyA9IG5ldyBPcGFxdWVUb2tlbignUk9VVEVSX09QVElPTlMnKTtcblxuZXhwb3J0IGludGVyZmFjZSBFeHRyYU9wdGlvbnMgeyBlbmFibGVUcmFjaW5nPzogYm9vbGVhbjsgfVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBSb3V0ZXIoXG4gICAgcmVmOiBBcHBsaWNhdGlvblJlZiwgcmVzb2x2ZXI6IENvbXBvbmVudFJlc29sdmVyLCB1cmxTZXJpYWxpemVyOiBVcmxTZXJpYWxpemVyLFxuICAgIG91dGxldE1hcDogUm91dGVyT3V0bGV0TWFwLCBsb2NhdGlvbjogTG9jYXRpb24sIGluamVjdG9yOiBJbmplY3RvciwgY29uZmlnOiBSb3V0ZXJDb25maWcsXG4gICAgb3B0czogRXh0cmFPcHRpb25zKSB7XG4gIGlmIChyZWYuY29tcG9uZW50VHlwZXMubGVuZ3RoID09IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0Jvb3RzdHJhcCBhdCBsZWFzdCBvbmUgY29tcG9uZW50IGJlZm9yZSBpbmplY3RpbmcgUm91dGVyLicpO1xuICB9XG4gIGNvbnN0IGNvbXBvbmVudFR5cGUgPSByZWYuY29tcG9uZW50VHlwZXNbMF07XG4gIGNvbnN0IHIgPVxuICAgICAgbmV3IFJvdXRlcihjb21wb25lbnRUeXBlLCByZXNvbHZlciwgdXJsU2VyaWFsaXplciwgb3V0bGV0TWFwLCBsb2NhdGlvbiwgaW5qZWN0b3IsIGNvbmZpZyk7XG4gIHJlZi5yZWdpc3RlckRpc3Bvc2VMaXN0ZW5lcigoKSA9PiByLmRpc3Bvc2UoKSk7XG5cbiAgaWYgKG9wdHMuZW5hYmxlVHJhY2luZykge1xuICAgIHIuZXZlbnRzLnN1YnNjcmliZShlID0+IHtcbiAgICAgIGNvbnNvbGUuZ3JvdXAoYFJvdXRlciBFdmVudDogJHsoPGFueT5lLmNvbnN0cnVjdG9yKS5uYW1lfWApO1xuICAgICAgY29uc29sZS5sb2coZS50b1N0cmluZygpKTtcbiAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgY29uc29sZS5ncm91cEVuZCgpO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cFJvdXRlckluaXRpYWxpemVyKGluamVjdG9yOiBJbmplY3Rvcikge1xuICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy85MTAxXG4gIC8vIERlbGF5IHRoZSByb3V0ZXIgaW5zdGFudGlhdGlvbiB0byBhdm9pZCBjaXJjdWxhciBkZXBlbmRlbmN5IChBcHBsaWNhdGlvblJlZiAtPlxuICAvLyBBUFBfSU5JVElBTElaRVIgLT4gUm91dGVyKVxuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBjb25zdCBhcHBSZWYgPSBpbmplY3Rvci5nZXQoQXBwbGljYXRpb25SZWYpO1xuICAgIGlmIChhcHBSZWYuY29tcG9uZW50VHlwZXMubGVuZ3RoID09IDApIHtcbiAgICAgIGFwcFJlZi5yZWdpc3RlckJvb3RzdHJhcExpc3RlbmVyKCgpID0+IHsgaW5qZWN0b3IuZ2V0KFJvdXRlcikuaW5pdGlhbE5hdmlnYXRpb24oKTsgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGluamVjdG9yLmdldChSb3V0ZXIpLmluaXRpYWxOYXZpZ2F0aW9uKCk7XG4gICAgfVxuICB9LCAwKTtcbiAgcmV0dXJuICgpOiBhbnkgPT4gbnVsbDtcbn1cblxuLyoqXG4gKiBBIGxpc3Qgb2Yge0BsaW5rIFByb3ZpZGVyfXMuIFRvIHVzZSB0aGUgcm91dGVyLCB5b3UgbXVzdCBhZGQgdGhpcyB0byB5b3VyIGFwcGxpY2F0aW9uLlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICogYGBgXG4gKiBAQ29tcG9uZW50KHtkaXJlY3RpdmVzOiBbUk9VVEVSX0RJUkVDVElWRVNdfSlcbiAqIGNsYXNzIEFwcENtcCB7XG4gKiAgIC8vIC4uLlxuICogfVxuICpcbiAqIGNvbnN0IHJvdXRlciA9IFtcbiAqICAge3BhdGg6ICcvaG9tZScsIGNvbXBvbmVudDogSG9tZX1cbiAqIF07XG4gKlxuICogYm9vdHN0cmFwKEFwcENtcCwgW3Byb3ZpZGVSb3V0ZXIocm91dGVyKV0pO1xuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcm92aWRlUm91dGVyKF9jb25maWc6IFJvdXRlckNvbmZpZywgX29wdHM6IEV4dHJhT3B0aW9ucyk6IGFueVtdIHtcbiAgcmV0dXJuIFtcbiAgICB7cHJvdmlkZTogUk9VVEVSX0NPTkZJRywgdXNlVmFsdWU6IF9jb25maWd9LCB7cHJvdmlkZTogUk9VVEVSX09QVElPTlMsIHVzZVZhbHVlOiBfb3B0c30sXG4gICAgTG9jYXRpb24sIHtwcm92aWRlOiBMb2NhdGlvblN0cmF0ZWd5LCB1c2VDbGFzczogUGF0aExvY2F0aW9uU3RyYXRlZ3l9LFxuICAgIHtwcm92aWRlOiBVcmxTZXJpYWxpemVyLCB1c2VDbGFzczogRGVmYXVsdFVybFNlcmlhbGl6ZXJ9LFxuXG4gICAge1xuICAgICAgcHJvdmlkZTogUm91dGVyLFxuICAgICAgdXNlRmFjdG9yeTogc2V0dXBSb3V0ZXIsXG4gICAgICBkZXBzOiBbXG4gICAgICAgIEFwcGxpY2F0aW9uUmVmLCBDb21wb25lbnRSZXNvbHZlciwgVXJsU2VyaWFsaXplciwgUm91dGVyT3V0bGV0TWFwLCBMb2NhdGlvbiwgSW5qZWN0b3IsXG4gICAgICAgIFJPVVRFUl9DT05GSUcsIFJPVVRFUl9PUFRJT05TXG4gICAgICBdXG4gICAgfSxcblxuICAgIFJvdXRlck91dGxldE1hcCxcbiAgICB7cHJvdmlkZTogQWN0aXZhdGVkUm91dGUsIHVzZUZhY3Rvcnk6IChyOiBSb3V0ZXIpID0+IHIucm91dGVyU3RhdGUucm9vdCwgZGVwczogW1JvdXRlcl19LFxuXG4gICAgLy8gVHJpZ2dlciBpbml0aWFsIG5hdmlnYXRpb25cbiAgICB7cHJvdmlkZTogQVBQX0lOSVRJQUxJWkVSLCBtdWx0aTogdHJ1ZSwgdXNlRmFjdG9yeTogc2V0dXBSb3V0ZXJJbml0aWFsaXplciwgZGVwczogW0luamVjdG9yXX1cbiAgXTtcbn1cbiJdfQ==