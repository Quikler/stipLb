<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    
    <xsl:template match="/">
        <html>
            <body>
                <h3>Кулінарні рецепти</h3>
                <table border="1">
                    <tr>
                        <th>Тип</th>
                        <th>Назва</th>
                        <th>Міра терезів</th>
                        <th>Інгредієнти</th>
                        <th>Рецепт</th>
                        <th>Калорії</th>
                    </tr>
                    <xsl:apply-templates select="КулінарнаКнига/Рецепт"></xsl:apply-templates>
                </table>
            </body>
        </html>
    </xsl:template>

    <xsl:template match="Рецепт">
        <xsl:if test="Калорії > 340">
            <tr>
                <td><xsl:value-of select="ТипСтрави"/></td>
                <td><xsl:value-of select="НазваСтрави"/></td>
                <td><xsl:value-of select="МіраТерезів"/></td>
                <td>
                    <xsl:for-each select="Інгредієнт">
                        <div>
                            <xsl:value-of select="Назва"/>: <xsl:value-of select="Кількість"/>
                        </div>
                    </xsl:for-each>
                </td>
                <td><xsl:value-of select="Рецепт"/></td>
                <td><xsl:value-of select="Калорії"/></td>
            </tr>
        </xsl:if>
    </xsl:template>

</xsl:stylesheet>