/*!
 * jQuery UI Core 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */
!(function (e) {
	'function' == typeof define && define.amd ? define(['jquery'], e) : e(jQuery);
})(function (a) {
	var e, t, n, i;
	function r(e, t) {
		var n,
			i,
			r,
			o = e.nodeName.toLowerCase();
		return 'area' === o
			? ((i = (n = e.parentNode).name),
			  !(!e.href || !i || 'map' !== n.nodeName.toLowerCase()) && !!(r = a("img[usemap='#" + i + "']")[0]) && s(r))
			: (/^(input|select|textarea|button|object)$/.test(o) ? !e.disabled : ('a' === o && e.href) || t) && s(e);
	}
	function s(e) {
		return (
			a.expr.filters.visible(e) &&
			!a(e)
				.parents()
				.addBack()
				.filter(function () {
					return 'hidden' === a.css(this, 'visibility');
				}).length
		);
	}
	(a.ui = a.ui || {}),
		a.extend(a.ui, {
			version: '1.11.4',
			keyCode: {
				BACKSPACE: 8,
				COMMA: 188,
				DELETE: 46,
				DOWN: 40,
				END: 35,
				ENTER: 13,
				ESCAPE: 27,
				HOME: 36,
				LEFT: 37,
				PAGE_DOWN: 34,
				PAGE_UP: 33,
				PERIOD: 190,
				RIGHT: 39,
				SPACE: 32,
				TAB: 9,
				UP: 38,
			},
		}),
		a.fn.extend({
			scrollParent: function (e) {
				var t = this.css('position'),
					n = 'absolute' === t,
					i = e ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
					r = this.parents()
						.filter(function () {
							var e = a(this);
							return (
								(!n || 'static' !== e.css('position')) &&
								i.test(e.css('overflow') + e.css('overflow-y') + e.css('overflow-x'))
							);
						})
						.eq(0);
				return 'fixed' !== t && r.length ? r : a(this[0].ownerDocument || document);
			},
			uniqueId:
				((e = 0),
				function () {
					return this.each(function () {
						this.id || (this.id = 'ui-id-' + ++e);
					});
				}),
			removeUniqueId: function () {
				return this.each(function () {
					/^ui-id-\d+$/.test(this.id) && a(this).removeAttr('id');
				});
			},
		}),
		a.extend(a.expr[':'], {
			data: a.expr.createPseudo
				? a.expr.createPseudo(function (t) {
						return function (e) {
							return !!a.data(e, t);
						};
				  })
				: function (e, t, n) {
						return !!a.data(e, n[3]);
				  },
			focusable: function (e) {
				return r(e, !isNaN(a.attr(e, 'tabindex')));
			},
			tabbable: function (e) {
				var t = a.attr(e, 'tabindex'),
					n = isNaN(t);
				return (n || 0 <= t) && r(e, !n);
			},
		}),
		a('<a>').outerWidth(1).jquery ||
			a.each(['Width', 'Height'], function (e, n) {
				var r = 'Width' === n ? ['Left', 'Right'] : ['Top', 'Bottom'],
					i = n.toLowerCase(),
					o = {
						innerWidth: a.fn.innerWidth,
						innerHeight: a.fn.innerHeight,
						outerWidth: a.fn.outerWidth,
						outerHeight: a.fn.outerHeight,
					};
				function s(e, t, n, i) {
					return (
						a.each(r, function () {
							(t -= parseFloat(a.css(e, 'padding' + this)) || 0),
								n && (t -= parseFloat(a.css(e, 'border' + this + 'Width')) || 0),
								i && (t -= parseFloat(a.css(e, 'margin' + this)) || 0);
						}),
						t
					);
				}
				(a.fn['inner' + n] = function (e) {
					return void 0 === e
						? o['inner' + n].call(this)
						: this.each(function () {
								a(this).css(i, s(this, e) + 'px');
						  });
				}),
					(a.fn['outer' + n] = function (e, t) {
						return 'number' != typeof e
							? o['outer' + n].call(this, e)
							: this.each(function () {
									a(this).css(i, s(this, e, !0, t) + 'px');
							  });
					});
			}),
		a.fn.addBack ||
			(a.fn.addBack = function (e) {
				return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
			}),
		a('<a>').data('a-b', 'a').removeData('a-b').data('a-b') &&
			(a.fn.removeData =
				((t = a.fn.removeData),
				function (e) {
					return arguments.length ? t.call(this, a.camelCase(e)) : t.call(this);
				})),
		(a.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase())),
		a.fn.extend({
			focus:
				((i = a.fn.focus),
				function (t, n) {
					return 'number' == typeof t
						? this.each(function () {
								var e = this;
								setTimeout(function () {
									a(e).focus(), n && n.call(e);
								}, t);
						  })
						: i.apply(this, arguments);
				}),
			disableSelection:
				((n = 'onselectstart' in document.createElement('div') ? 'selectstart' : 'mousedown'),
				function () {
					return this.bind(n + '.ui-disableSelection', function (e) {
						e.preventDefault();
					});
				}),
			enableSelection: function () {
				return this.unbind('.ui-disableSelection');
			},
			zIndex: function (e) {
				if (void 0 !== e) return this.css('zIndex', e);
				if (this.length)
					for (var t, n, i = a(this[0]); i.length && i[0] !== document; ) {
						if (
							('absolute' === (t = i.css('position')) || 'relative' === t || 'fixed' === t) &&
							((n = parseInt(i.css('zIndex'), 10)), !isNaN(n) && 0 !== n)
						)
							return n;
						i = i.parent();
					}
				return 0;
			},
		}),
		(a.ui.plugin = {
			add: function (e, t, n) {
				var i,
					r = a.ui[e].prototype;
				for (i in n) (r.plugins[i] = r.plugins[i] || []), r.plugins[i].push([t, n[i]]);
			},
			call: function (e, t, n, i) {
				var r,
					o = e.plugins[t];
				if (o && (i || (e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType)))
					for (r = 0; r < o.length; r++) e.options[o[r][0]] && o[r][1].apply(e.element, n);
			},
		});
});
