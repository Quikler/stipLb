<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:output method="html" encoding="UTF-8"/>
    <xsl:strip-space elements="*"/>

    <xsl:template match="/КулінарнаКнига">
        <html>
            <head>
                <title>Кулінарна Книга</title>
            </head>
            <body>
                <h1>Список Рецептів</h1>
                <table border="1">
                    <tr>
                        <th>Назва Страви</th>
                        <th>Тип Страви</th>
                        <th>Калорії</th>
                    </tr>
                    <xsl:for-each select="Рецепт[Калорії &lt;= 500]">
                        <xsl:sort select="Калорії" data-type="number" order="ascending"/>
                        <tr>
                            <td><xsl:value-of select="НазваСтрави"/></td>
                            <td><xsl:value-of select="ТипСтрави"/></td>
                            <td><xsl:value-of select="Калорії"/></td>
                        </tr>
                    </xsl:for-each>
                </table>
            </body>
        </html>
    </xsl:template>

</xsl:stylesheet>